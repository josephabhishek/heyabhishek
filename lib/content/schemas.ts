import { z } from 'zod';

/* ===========================================================================
 * THE BRAND, ENCODED
 *
 * These schemas run at build time. They are the mechanism by which the
 * project's non-negotiables stop depending on discipline and start depending
 * on the compiler:
 *
 *   · a Metric without a denominator and a caveat will not validate
 *   · an Exhibit without a source will not validate
 *   · a case study without a mistake, an open question, an attribution limit,
 *     a rejected option or three exhibits will not validate
 *
 * A failing content build is the system working. The fix is the content.
 * See docs/CONTENT_WORKFLOW.md.
 * ======================================================================== */

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use an ISO date: YYYY-MM-DD');

const nonEmpty = (label: string) => z.string().trim().min(1, `${label} is required`);

/* --------------------------------------------------------------------------
 * THE SOURCE LINE — provenance. Doubles as the primary desire mechanism
 * (Phase 02, M3): honesty apparatus and luxury apparatus are the same field.
 * ----------------------------------------------------------------------- */
export const sourceSchema = z.object({
  tool: nonEmpty('source.tool'),
  subject: nonEmpty('source.subject'),
  dateRange: z.object({ start: isoDate, end: isoDate.optional() }),
  method: nonEmpty('source.method'),
  /** e.g. "branded queries excluded" — the distinction most practitioners hide. */
  exclusions: z.string().trim().optional(),
  /**
   * How the figure was obtained. Rendered as a visible word, never a colour.
   *
   *   measured      read directly from the named tool
   *   self-reported the client told me
   *   estimated     derived or inferred; the method must say how
   *
   * Default is `measured`, because anything weaker should be a deliberate act
   * of typing it out.
   */
  status: z.enum(['measured', 'self-reported', 'estimated']).default('measured'),
  /** Where a reader could go to check, when the source is public. */
  url: z.string().url().optional(),
});

/* --------------------------------------------------------------------------
 * THE TRIAD — no number ever appears alone.
 * ----------------------------------------------------------------------- */
export const metricSchema = z.object({
  value: z.union([z.number(), z.string().trim().min(1)]),
  unit: z.string().trim().optional(),
  denominator: nonEmpty('metric.denominator'),
  timeframe: nonEmpty('metric.timeframe'),
  caveat: nonEmpty('metric.caveat'),
  source: sourceSchema,
});

/* --------------------------------------------------------------------------
 * THE EXHIBIT — evidence, numbered, captioned, sourced, legible.
 * ----------------------------------------------------------------------- */
export const exhibitSchema = z.object({
  id: nonEmpty('exhibit.id'),
  media: z.object({
    type: z.enum(['image', 'video', 'table']),
    src: nonEmpty('exhibit.media.src'),
    /** Alt text must carry the FINDING. An exhibit whose finding cannot be
     *  expressed in words is not usable as evidence (Phase 04, D11). */
    alt: z.string().trim().min(12, 'Alt text must describe what the evidence shows'),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  }),
  caption: nonEmpty('exhibit.caption'),
  source: sourceSchema,
  annotation: z.string().trim().optional(),
  cropDisclosed: z.boolean().default(false),
});

/* --------------------------------------------------------------------------
 * THE PAIR — two states, identical scale, conditions always stated.
 * One per document maximum (Phase 04 performance finding).
 * ----------------------------------------------------------------------- */
export const pairSchema = z.object({
  before: z.object({ media: nonEmpty('pair.before.media'), label: nonEmpty('pair.before.label') }),
  after: z.object({ media: nonEmpty('pair.after.media'), label: nonEmpty('pair.after.label') }),
  interval: nonEmpty('pair.interval'),
  /** Device, connection, date. A comparison without conditions is not evidence. */
  conditions: nonEmpty('pair.conditions'),
  /** Always present, never a fallback: carries the whole argument in words. */
  textEquivalent: z.string().trim().min(20, 'The Pair must state its argument in text'),
});

/* --------------------------------------------------------------------------
 * THE OPEN QUESTION — every document ends unresolved.
 * ----------------------------------------------------------------------- */
export const openQuestionSchema = z.object({
  text: nonEmpty('openQuestion.text'),
  raisedOn: isoDate,
  resolvedOn: isoDate.optional(),
  resolution: z.string().trim().optional(),
});

export const researchItemSchema = z.object({
  question: nonEmpty('research.question'),
  method: nonEmpty('research.method'),
  finding: nonEmpty('research.finding'),
  /** An enum, not prose — so it renders consistently and cannot be omitted. */
  confidence: z.enum(['certain', 'probable', 'guess']),
});

export const mistakeSchema = z.object({
  whatIThought: nonEmpty('mistake.whatIThought'),
  whatHappened: nonEmpty('mistake.whatHappened'),
  /** A mistake without the resulting judgement reads junior (Phase 02). */
  whatIChanged: nonEmpty('mistake.whatIChanged'),
});

export const strategySchema = z.object({
  chosen: nonEmpty('strategy.chosen'),
  rationale: nonEmpty('strategy.rationale'),
  /** The highest-value field in the framework: judgement is visible in what
   *  was declined, not in what was done. */
  rejected: z.array(z.object({ option: nonEmpty('option'), why: nonEmpty('why') })).min(1),
});

export const resultsSchema = z.object({
  outcome: nonEmpty('results.outcome'),
  /** Client currency: bookings, enquiries, rupees — never sessions. */
  currency: nonEmpty('results.currency'),
  metrics: z.array(metricSchema).default([]),
  /** Renders inline with the outcome, never as a footnote. */
  attributionLimit: nonEmpty('results.attributionLimit'),
});

/** Derived from `git log`, never authored. */
export const revisionSchema = z.object({
  date: isoDate,
  commitMessage: z.string(),
  hash: z.string(),
});

const documentBase = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  title: nonEmpty('title'),
  summary: z.string().trim().max(200, 'Summary must be 200 characters or fewer'),
  /** Present from day one so a co-author never requires a migration. */
  author: z.string().trim().default('TBD'),
  published: isoDate,
  draft: z.boolean().default(false),
  targetQuery: z.string().trim().nullable().default(null),
});

/* ==========================  CASE STUDY  ================================= */
export const caseStudySchema = documentBase.extend({
  client: nonEmpty('client'),
  /** Carries the multi-industry claim. Required on every case study. */
  industry: nonEmpty('industry'),
  dateRange: z.object({ start: isoDate, end: isoDate.optional() }),
  context: nonEmpty('context'),
  challenge: z.object({ quote: nonEmpty('challenge.quote'), attribution: nonEmpty('attribution') }),
  research: z.array(researchItemSchema).min(1),
  /** A project without constraints reads as invented. */
  constraints: z.array(nonEmpty('constraint')).min(1),
  strategy: strategySchema,
  execution: nonEmpty('execution'),
  technology: z.string().trim().optional(),
  marketing: z.string().trim().optional(),
  seo: z.string().trim().optional(),
  measurement: nonEmpty('measurement'),
  results: resultsSchema,
  mistakes: z.array(mistakeSchema).min(1, 'At least one mistake is required'),
  /** About the PROBLEM, never the industry — the transferability mechanism. */
  lessons: z.array(nonEmpty('lesson')).min(1),
  openQuestion: openQuestionSchema,
  nextSteps: nonEmpty('nextSteps'),
  exhibits: z.array(exhibitSchema).min(3, 'At least three exhibits are required'),
  pair: pairSchema.optional(),
});

/* ==========================  TEARDOWN  ================================== */
export const teardownSchema = documentBase.extend({
  subjectUrl: z.string().url(),
  industry: nonEmpty('industry'),
  publicDataOnly: z.literal(true),
  context: nonEmpty('context'),
  research: z.array(researchItemSchema).min(1),
  whatIsWorking: z.array(nonEmpty('item')).min(1),
  whatIsCostingThem: z.array(nonEmpty('item')).min(1),
  whatIWouldDoFirst: nonEmpty('whatIWouldDoFirst'),
  /** Honesty about the limits of an outside view. */
  whatICannotKnow: z.array(nonEmpty('item')).min(1),
  lessons: z.array(nonEmpty('lesson')).min(1),
  openQuestion: openQuestionSchema,
  exhibits: z.array(exhibitSchema).min(1),
});

/* ==========================  JOURNAL  =================================== */
export const journalEntrySchema = documentBase.extend({
  whatIGotWrong: z.string().trim().optional(),
  relatedTo: z.array(z.string().trim()).default([]),
});

/* ==========================  EXPERIMENT  ================================ */
export const experimentSchema = documentBase.extend({
  hypothesis: nonEmpty('hypothesis'),
  /** Recorded BEFORE the result, or memory rewrites the prediction. */
  expected: nonEmpty('expected'),
  changed: nonEmpty('changed'),
  measurementMethod: nonEmpty('measurementMethod'),
  result: nonEmpty('result'),
  verdict: z.enum(['confirmed', 'refuted', 'inconclusive']),
  openQuestion: openQuestionSchema,
  exhibits: z.array(exhibitSchema).default([]),
});

/* ==========================  INSIGHT  =================================== */
export const insightSchema = documentBase.extend({
  thesis: nonEmpty('thesis'),
  openQuestion: openQuestionSchema,
  exhibits: z.array(exhibitSchema).default([]),
});

/* ==========================  PROJECT  =================================== */
export const projectSchema = documentBase.extend({
  /** Honest labelling. Replaces any inflated aggregate count. */
  kind: z.enum(['live-client', 'practice', 'experiment']),
  industry: z.string().trim().optional(),
  url: z.string().url().optional(),
  stack: z.array(nonEmpty('stack item')).default([]),
});

export const contentKinds = [
  'case-studies',
  'teardowns',
  'journal',
  'experiments',
  'insights',
  'projects',
] as const;

export type ContentKind = (typeof contentKinds)[number];

export const schemaByKind = {
  'case-studies': caseStudySchema,
  teardowns: teardownSchema,
  journal: journalEntrySchema,
  experiments: experimentSchema,
  insights: insightSchema,
  projects: projectSchema,
} as const satisfies Record<ContentKind, z.ZodType>;

export type Source = z.infer<typeof sourceSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type Exhibit = z.infer<typeof exhibitSchema>;
export type Pair = z.infer<typeof pairSchema>;
export type OpenQuestion = z.infer<typeof openQuestionSchema>;
export type ResearchItem = z.infer<typeof researchItemSchema>;
export type Mistake = z.infer<typeof mistakeSchema>;
export type Strategy = z.infer<typeof strategySchema>;
export type Results = z.infer<typeof resultsSchema>;
export type Revision = z.infer<typeof revisionSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type Teardown = z.infer<typeof teardownSchema>;
export type JournalEntry = z.infer<typeof journalEntrySchema>;
export type Experiment = z.infer<typeof experimentSchema>;
export type Insight = z.infer<typeof insightSchema>;
export type Project = z.infer<typeof projectSchema>;
