import fs from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { schemaByKind, type ContentKind } from './schemas';
import { contentDir } from './paths';

export interface LoadedDocument<T> {
  readonly kind: ContentKind;
  readonly slug: string;
  /** Repo-relative, for git history lookup. */
  readonly filePath: string;
  readonly frontmatter: T;
  readonly body: string;
}

export interface ValidationFailure {
  readonly filePath: string;
  readonly issues: readonly string[];
}

async function readMdxFiles(dir: string): Promise<string[]> {
  let entries: Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // A document may be a directory containing index.mdx plus co-located
      // exhibits (docs/CONTENT_WORKFLOW.md).
      const index = path.join(full, 'index.mdx');
      try {
        await fs.access(index);
        files.push(index);
      } catch {
        /* directory without an index.mdx is ignored */
      }
    } else if (entry.name.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files.sort();
}

function slugFor(kind: ContentKind, filePath: string): string {
  const rel = path.relative(contentDir(kind), filePath);
  return rel.endsWith(path.join('index.mdx')) ? path.dirname(rel) : rel.replace(/\.mdx$/, '');
}

/**
 * Loads and validates every document of a kind.
 *
 * Returns failures rather than throwing so `validate:content` can report all
 * problems at once instead of one per run.
 */
export async function loadAll(
  kind: ContentKind,
): Promise<{ documents: LoadedDocument<unknown>[]; failures: ValidationFailure[] }> {
  const files = await readMdxFiles(contentDir(kind));
  const documents: LoadedDocument<unknown>[] = [];
  const failures: ValidationFailure[] = [];
  const schema = schemaByKind[kind];

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const slug = slugFor(kind, filePath);

    const result = schema.safeParse({ slug, ...data });
    if (!result.success) {
      failures.push({
        filePath: path.relative(process.cwd(), filePath),
        issues: result.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`),
      });
      continue;
    }

    documents.push({
      kind,
      slug,
      filePath: path.relative(process.cwd(), filePath),
      frontmatter: result.data,
      body: content,
    });
  }

  return { documents, failures };
}
