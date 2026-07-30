/**
 * Copies the required font files out of the Fontsource packages into
 * public/fonts, where styles/fonts.css expects them.
 *
 * Why a copy step rather than `next/font/local`:
 *
 *   `next/font/local` hard-fails the build if a file is missing, and the files
 *   live in node_modules rather than in the repository. That would make the
 *   build depend on install order and would break a fresh clone before
 *   install. This script runs on postinstall, is idempotent, and — critically
 *   — **never fails the install**. If a face cannot be found, it warns and
 *   exits zero: the metric-adjusted fallback stacks in styles/fonts.css render
 *   correctly, and nothing on the site depends on a web font being present.
 *
 * Files are discovered by pattern rather than by exact name, so a Fontsource
 * naming change degrades to a warning instead of a broken build.
 */
import { mkdir, readdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'fonts');
const BUDGET_KB = 100;

/** [package, file matcher, destination] */
const FACES = [
  ['@fontsource-variable/ibm-plex-sans', /latin-wght-normal\.woff2$/, 'ibm-plex-sans-latin.woff2'],
  [
    '@fontsource-variable/ibm-plex-sans',
    /latin-wght-italic\.woff2$/,
    'ibm-plex-sans-latin-italic.woff2',
  ],
  [
    '@fontsource-variable/newsreader',
    /latin-(opsz_)?wght-italic\.woff2$/,
    'newsreader-latin-italic.woff2',
  ],
  [
    '@fontsource-variable/newsreader',
    /latin-(opsz_)?wght-normal\.woff2$/,
    'newsreader-latin.woff2',
  ],
];

async function findFile(pkg, matcher) {
  const dir = path.join(ROOT, 'node_modules', pkg, 'files');
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return null;
  }
  const match = entries.find((name) => matcher.test(name));
  return match ? path.join(dir, match) : null;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  let copied = 0;
  let totalKb = 0;
  const missing = [];

  for (const [pkg, matcher, dest] of FACES) {
    const source = await findFile(pkg, matcher);
    if (!source) {
      missing.push(dest);
      continue;
    }
    const target = path.join(OUT, dest);
    await copyFile(source, target);
    const { size } = await stat(target);
    totalKb += size / 1024;
    copied += 1;
  }

  if (copied > 0) {
    console.log(`fonts: copied ${String(copied)} face(s), ${totalKb.toFixed(1)}KB total`);
  }

  if (totalKb > BUDGET_KB) {
    console.warn(
      `fonts: ${totalKb.toFixed(1)}KB exceeds the ${String(BUDGET_KB)}KB budget. ` +
        `Subset further — see public/fonts/README.md. Do not raise the budget.`,
    );
  }

  if (missing.length > 0) {
    console.warn(
      `fonts: could not locate ${missing.join(', ')}. ` +
        `The site will render with metric-adjusted fallbacks. ` +
        `Run \`npm run fonts:install\` after \`npm install\` completes.`,
    );
  }
}

// Never fail the install over a font.
main().catch((error) => {
  console.warn('fonts: skipped —', error instanceof Error ? error.message : error);
});
