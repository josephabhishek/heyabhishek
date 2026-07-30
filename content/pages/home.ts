/**
 * Homepage content.
 *
 * PROVISIONAL. Drawn from the approved messaging framework. Final copy is a
 * writing task, not an engineering one, and it is blocked on the same three
 * open items as the first case study: the naming decision, the branded vs.
 * non-branded split, and one outcome in client currency.
 *
 * It lives here rather than inside the page component so that revising a
 * sentence never means touching JSX, and so a diff of a copy change is
 * readable.
 *
 * NOTHING HERE MAY STATE A RESULT. No metric, no client name and no outcome
 * appears on this page until it exists in a validated case study, where the
 * schema can enforce its denominator, timeframe, caveat and source.
 */
export const home = {
  meta: {
    title: 'Most websites are a cost nobody measured',
    description:
      'I build business websites, then measure what they earn. Every number on this site is sourced, and includes the ones that disappointed me.',
  },

  /**
   * The opening chapter. A briefing document, not a hero.
   *
   * Register note: fields are stated plainly. There is no "CONFIDENTIAL" stamp
   * and no redaction — those are costume, and a document that pretends to be
   * secret while sitting on a public URL is making a claim it cannot support.
   */
  brief: {
    /** The visitor's category. Addressed to a situation, not to a person. */
    subject: 'Independent businesses that are found before they are called',
    /** The finding, stated as a finding. */
    headline: 'Most websites are a cost nobody measured.',
    /** Executive summary. One paragraph. */
    summary:
      'I build business websites, instrument them, and then tell you what they earned — including when the answer is disappointing. This document explains the method and shows the evidence behind it.',
    /** A human voice at close range. The first warmth on the page. */
    annotation:
      'Almost every site in this category opens by telling you how good its owner is. I would rather open with the thing that is probably costing you money.',
    /** Default addressee, until the visitor names themselves. */
    preparedForFallback: 'Owner-operated businesses in India',
    /** Honest status. Understates deliberately; the numbers are small and said so. */
    status: 'Three live clients. First case study in preparation.',
  },

  story: {
    heading: 'Every result has a reason',
    subheading:
      'Most digital work cannot be checked. "Data-driven", "ROI-focused", "we drive growth" — claimed by everyone, verifiable by nobody, and therefore worth nothing to you.',
    body: [
      'This practice takes the opposite position. Every outcome connects backwards through the decision that caused it, and every decision to the evidence that justified it.',
      'Where that chain is strong, I show it. Where it is short, I say so — a short honest chain is worth more than a long invented one.',
    ],
    annotation:
      'This is the part most people skip. It is also the only part that lets you tell competence from confidence.',
  },

  evidence: {
    heading: 'Nothing claimed. Everything traced.',
    subheading:
      'Every figure on this site arrives with what it is out of, over what period, and what it does not prove.',
  },

  process: {
    heading: 'Diagnose, fix, measure, repeat',
    subheading: 'Nothing skipped, nothing assumed.',
    steps: [
      {
        title: 'Diagnosis',
        body: 'Before any proposal, and sometimes the whole engagement. Most businesses do not need a new channel — they need to stop losing what they already have.',
      },
      {
        title: 'Correction',
        body: 'Build, restructure, accelerate. Design that knows what the search work needs; code that knows what the measurement requires.',
      },
      {
        title: 'Measurement',
        body: 'Instrumented at launch, so month one produces facts instead of hope. Reported in your terms — enquiries and rupees, not sessions and impressions.',
      },
      {
        title: 'Iteration',
        body: 'Including the changes that did not work, which get written down.',
      },
    ],
  },

  cases: {
    heading: 'The evidence',
    subheading: 'Full accounts of real engagements, including what went wrong.',
    empty:
      'No case studies published yet. The first is being written; it will not go up until its numbers can be stated honestly.',
  },

  contact: {
    heading: 'What do you think your website is costing you?',
    body: 'Tell me what is bothering you. If I am not the right person, I will say so and point you somewhere better.',
    commitment: 'I reply within a working day, usually sooner.',
    ownership:
      'You own everything — domain, code, analytics, data and access. There is no lock-in, and I will put that in writing.',
  },
} as const;
