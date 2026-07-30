/**
 * Performance budget gate.
 *
 * Reads the production build output and fails if any route exceeds its
 * first-load JavaScript budget, or if any static asset exceeds its ceiling.
 *
 * POLICY: never raise a budget to pass this gate. Remove the offending
 * feature instead. (Phase 04, Deliverable 12.)
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

// Kept in sync with config/performance.ts. Duplicated deliberately: this
// script must run without a TypeScript toolchain in CI.
const BUDGETS = {
  initialJsPerRouteKb: 120,
  fontsTotalKb: 100,
  largestImageKb: 200,
  largestRecordingKb: 400,
};

const KB = 1024;
const failures = [];

async function dirSizeKb(dir, extensions) {
  let total = 0;
  let largest = { file: null, kb: 0 };

  async function walk(current) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (extensions && !extensions.some((ext) => entry.name.endsWith(ext))) continue;
      const { size } = await stat(full);
      const kb = size / KB;
      total += kb;
      if (kb > largest.kb) largest = { file: path.relative(ROOT, full), kb };
    }
  }

  await walk(dir);
  return { total, largest };
}

async function checkJsBudget() {
  const manifestPath = path.join(ROOT, '.next', 'app-build-manifest.json');
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch {
    console.log('No build manifest found — run `npm run build` first. Skipping JS budget.');
    return;
  }

  for (const [route, files] of Object.entries(manifest.pages ?? {})) {
    let kb = 0;
    for (const file of files) {
      if (!file.endsWith('.js')) continue;
      try {
        const { size } = await stat(path.join(ROOT, '.next', file));
        kb += size / KB;
      } catch {
        /* chunk not on disk (dev manifest); ignore */
      }
    }
    if (kb > BUDGETS.initialJsPerRouteKb) {
      failures.push(
        `${route}: first-load JS ${kb.toFixed(1)}KB exceeds ${BUDGETS.initialJsPerRouteKb}KB`,
      );
    } else if (kb > 0) {
      console.log(`${route}: ${kb.toFixed(1)}KB JS`);
    }
  }
}

async function checkAssetBudgets() {
  const fonts = await dirSizeKb(path.join(ROOT, 'public', 'fonts'), ['.woff2', '.woff', '.ttf']);
  if (fonts.total > BUDGETS.fontsTotalKb) {
    failures.push(`fonts: ${fonts.total.toFixed(1)}KB exceeds ${BUDGETS.fontsTotalKb}KB`);
  }

  const images = await dirSizeKb(path.join(ROOT, 'public', 'images'), [
    '.avif',
    '.webp',
    '.jpg',
    '.jpeg',
    '.png',
  ]);
  if (images.largest.kb > BUDGETS.largestImageKb) {
    failures.push(
      `${images.largest.file}: ${images.largest.kb.toFixed(1)}KB exceeds ${BUDGETS.largestImageKb}KB`,
    );
  }

  const videos = await dirSizeKb(path.join(ROOT, 'public', 'videos'), ['.mp4', '.webm']);
  if (videos.largest.kb > BUDGETS.largestRecordingKb) {
    failures.push(
      `${videos.largest.file}: ${videos.largest.kb.toFixed(1)}KB exceeds ${BUDGETS.largestRecordingKb}KB`,
    );
  }
}

await checkJsBudget();
await checkAssetBudgets();

if (failures.length > 0) {
  console.error('\nBudget failures:');
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error('\nDo not raise the budget. Remove the feature.');
  process.exit(1);
}

console.log('\nAll budgets within limits.');
