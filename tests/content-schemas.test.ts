import { describe, expect, it } from 'vitest';
import { caseStudySchema, metricSchema, exhibitSchema, pairSchema } from '@/lib/content/schemas';

/**
 * These are not example tests. They assert the brand's non-negotiables, which
 * this project enforces through the type and validation layer rather than
 * through discipline. If any of these tests stops failing on invalid input,
 * the enforcement mechanism has been weakened and the identity is at risk.
 */

const source = {
  tool: 'Google Search Console',
  subject: 'example-client',
  dateRange: { start: '2026-03-07', end: '2026-03-14' },
  method: 'organic queries',
  exclusions: 'branded queries excluded',
};

describe('a number can never appear alone', () => {
  it('rejects a metric with no caveat', () => {
    const result = metricSchema.safeParse({
      value: 62,
      denominator: '605 impressions',
      timeframe: 'one week',
      source,
    });
    expect(result.success).toBe(false);
  });

  it('rejects a metric with no denominator', () => {
    const result = metricSchema.safeParse({
      value: 62,
      timeframe: 'one week',
      caveat: 'small sample; not yet a trend',
      source,
    });
    expect(result.success).toBe(false);
  });

  it('accepts a complete triad', () => {
    const result = metricSchema.safeParse({
      value: 62,
      denominator: '605 impressions',
      timeframe: 'one week',
      caveat: 'small sample; not yet a trend',
      source,
    });
    expect(result.success).toBe(true);
  });
});

describe('evidence must be sourced and describable', () => {
  it('rejects an exhibit with no source', () => {
    const result = exhibitSchema.safeParse({
      id: 'exhibit-1',
      media: { type: 'image', src: '/images/x.avif', alt: 'Search Console coverage report' },
      caption: 'Coverage report',
    });
    expect(result.success).toBe(false);
  });

  it('rejects alt text too short to carry a finding', () => {
    const result = exhibitSchema.safeParse({
      id: 'exhibit-1',
      media: { type: 'image', src: '/images/x.avif', alt: 'screenshot' },
      caption: 'Coverage report',
      source,
    });
    expect(result.success).toBe(false);
  });
});

describe('a comparison must state its conditions and its argument in words', () => {
  it('rejects a pair with no conditions', () => {
    const result = pairSchema.safeParse({
      before: { media: '/videos/before.mp4', label: 'Before' },
      after: { media: '/videos/after.mp4', label: 'After' },
      interval: '6 weeks',
      textEquivalent: 'Before: 11.2 seconds. After: 1.6 seconds.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a pair with no text equivalent', () => {
    const result = pairSchema.safeParse({
      before: { media: '/videos/before.mp4', label: 'Before' },
      after: { media: '/videos/after.mp4', label: 'After' },
      interval: '6 weeks',
      conditions: 'Throttled 4G, mid-range Android, 14 March 2026',
    });
    expect(result.success).toBe(false);
  });
});

describe('a case study cannot omit the uncomfortable parts', () => {
  const base = {
    slug: 'example-client',
    title: 'Example — nobody could find them',
    summary: 'A short summary.',
    published: '2026-03-20',
    client: 'Example Client',
    industry: 'hospitality',
    dateRange: { start: '2026-01-10' },
    context: 'A 20-key property dependent on OTA bookings.',
    challenge: { quote: 'Nobody could find us.', attribution: 'owner' },
    research: [
      {
        question: 'Why is there no visibility?',
        method: 'Search Console audit',
        finding: 'The site was not indexed.',
        confidence: 'certain',
      },
    ],
    constraints: ['No budget for photography'],
    strategy: {
      chosen: 'Fix indexation first',
      rationale: 'Nothing else matters until the site can be found.',
      rejected: [{ option: 'Paid search', why: 'Would mask the underlying problem' }],
    },
    execution: 'Rebuilt the site and submitted a sitemap.',
    measurement: 'Search Console, weekly.',
    results: {
      outcome: 'Indexed and ranking within a week',
      currency: 'enquiries',
      attributionLimit: 'Mostly branded queries; not competitive ranking.',
    },
    mistakes: [
      {
        whatIThought: 'Images were the bottleneck.',
        whatHappened: 'A third-party script was.',
        whatIChanged: 'I now profile scripts before images.',
      },
    ],
    lessons: ['Diagnose indexation before optimising anything else.'],
    openQuestion: { text: 'Will the ranking hold in low season?', raisedOn: '2026-03-20' },
    nextSteps: 'Monitor through October.',
    exhibits: [1, 2, 3].map((n) => ({
      id: `exhibit-${String(n)}`,
      media: {
        type: 'image',
        src: `/images/e${String(n)}.avif`,
        alt: 'Search Console coverage report showing indexation',
      },
      caption: 'Coverage report',
      source,
    })),
  };

  it('accepts a complete case study', () => {
    expect(caseStudySchema.safeParse(base).success).toBe(true);
  });

  it('rejects one with no mistakes', () => {
    expect(caseStudySchema.safeParse({ ...base, mistakes: [] }).success).toBe(false);
  });

  it('rejects one with no rejected options', () => {
    const strategy = { ...base.strategy, rejected: [] };
    expect(caseStudySchema.safeParse({ ...base, strategy }).success).toBe(false);
  });

  it('rejects one with fewer than three exhibits', () => {
    expect(
      caseStudySchema.safeParse({ ...base, exhibits: base.exhibits.slice(0, 2) }).success,
    ).toBe(false);
  });

  it('rejects one with no attribution limit', () => {
    const results = { outcome: 'Ranked', currency: 'enquiries' };
    expect(caseStudySchema.safeParse({ ...base, results }).success).toBe(false);
  });

  it('rejects one with no constraints', () => {
    expect(caseStudySchema.safeParse({ ...base, constraints: [] }).success).toBe(false);
  });
});
