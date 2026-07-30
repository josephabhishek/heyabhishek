import type { ReactNode } from 'react';
import { Grid, GridCell } from './grid';
import { cn } from '@/lib/cn';

/**
 * Editorial layout — the three-zone reading relationship.
 *
 * Evidence, annotation and apparatus must always be distinguishable and
 * adjacent. Note this is a RELATIONSHIP, not a fixed geometry: on a narrow
 * screen adjacency means sequential and visually differentiated, not
 * side-by-side. Three persistent columns at 320px would be crowding, which is
 * why the earlier fixed-geometry specification was amended (Phase 02,
 * Deliverable 07 — recorded as an Amendment).
 */
export interface EditorialLayoutProps {
  readonly evidence: ReactNode;
  readonly annotation?: ReactNode;
  readonly className?: string;
}

export function EditorialLayout({ evidence, annotation, className }: EditorialLayoutProps) {
  return (
    <Grid className={cn(className)}>
      <GridCell region="evidence">{evidence}</GridCell>
      {annotation ? <GridCell region="annotation">{annotation}</GridCell> : null}
    </Grid>
  );
}
