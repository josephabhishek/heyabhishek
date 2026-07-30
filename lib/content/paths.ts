import path from 'node:path';
import { contentKinds, type ContentKind } from './schemas';

export const CONTENT_ROOT = path.join(process.cwd(), 'content');

export function contentDir(kind: ContentKind): string {
  return path.join(CONTENT_ROOT, kind);
}

export { contentKinds };
export type { ContentKind };
