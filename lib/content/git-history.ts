import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { Revision } from './schemas';

const run = promisify(execFile);

/**
 * Revision history is DERIVED from git, never authored.
 *
 * Why: the Amendment element becomes free and automatic, and it cannot drift
 * from reality because it *is* the reality. Commit messages become the public
 * "reason for revision" field — which is why Conventional Commits are
 * mandatory and why commit messages must be written as if published.
 *
 * Requires full history in CI: actions/checkout with `fetch-depth: 0`.
 * Degrades to an empty list rather than failing the build, so a shallow
 * clone or a fresh repository still builds.
 */
export async function revisionsForFile(relativePath: string): Promise<Revision[]> {
  try {
    const { stdout } = await run(
      'git',
      ['log', '--follow', '--date=short', '--format=%h%x09%ad%x09%s', '--', relativePath],
      { cwd: process.cwd(), maxBuffer: 1024 * 1024 },
    );

    return stdout
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const [hash = '', date = '', ...rest] = line.split('\t');
        return { hash, date, commitMessage: rest.join('\t') };
      })
      .filter((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.date));
  } catch {
    return [];
  }
}
