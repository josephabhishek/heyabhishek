/**
 * Content validation gate.
 *
 * Runs every schema against every document and reports ALL failures at once.
 * Exits non-zero on any failure, which fails CI and fails the build.
 *
 * A failing content build is the system working as designed: the brand's
 * non-negotiables (a caveat on every number, a source on every exhibit, a
 * mistake and an open question in every case study) are enforced here rather
 * than remembered. The fix is always the content, never the schema.
 */
import { loadAll } from '../lib/content/loader';
import { contentKinds } from '../lib/content/schemas';

async function main(): Promise<void> {
  let total = 0;
  let failed = 0;

  for (const kind of contentKinds) {
    const { documents, failures } = await loadAll(kind);
    total += documents.length + failures.length;
    failed += failures.length;

    if (failures.length > 0) {
      console.error(`\n${kind}: ${String(failures.length)} invalid`);
      for (const failure of failures) {
        console.error(`  ${failure.filePath}`);
        for (const issue of failure.issues) {
          console.error(`    - ${issue}`);
        }
      }
    } else if (documents.length > 0) {
      console.log(`${kind}: ${String(documents.length)} valid`);
    }
  }

  if (total === 0) {
    console.log('No content yet. Schemas are in place and will gate the first document.');
    return;
  }

  if (failed > 0) {
    console.error(`\n${String(failed)} of ${String(total)} documents failed validation.`);
    process.exit(1);
  }

  console.log(`\nAll ${String(total)} documents valid.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
