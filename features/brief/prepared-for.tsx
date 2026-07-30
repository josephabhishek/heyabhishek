'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * PreparedFor — the opening interaction.
 *
 * ### Why this, and not opening a cover
 *
 * Six openings were considered: turning a page, sliding a cover aside,
 * removing a paper clip, breaking a seal, unlocking, and this.
 *
 * The first five share two fatal problems. They are **skeuomorphic props** —
 * representing an object rather than doing anything — which the material law
 * forbids. And every one of them is a **gate**: content held behind an
 * interaction. A cover you must open is a preloader with better manners. It
 * delays evidence, it is hostile to keyboard and screen-reader users, and it
 * hides the opening paragraph from search engines.
 *
 * This one is different in kind. A brief is *prepared for* someone. Naming the
 * reader is the one thing a printed brief cannot do — a PDF is prepared for
 * whoever it was addressed to, forever. **This is the answer to "why is this
 * not a PDF", stated in the first six seconds rather than argued later.**
 *
 * ### It is entirely optional
 *
 * The document is complete without it. With no input the line reads as a
 * category — the brief is addressed to a kind of business. Type, and it
 * becomes addressed to yours. Nothing is submitted, nothing is stored, nothing
 * is sent. There is no button, because there is nothing to send.
 *
 * ### Accessibility
 * - A real labelled `<input>`, not a contenteditable div.
 * - Works with keyboard alone; Enter simply blurs, it does not navigate.
 * - Without JavaScript the default category text renders and reads correctly.
 * - The live region is polite and only announces a completed change, so a
 *   screen-reader user is not read every keystroke.
 */
export interface PreparedForProps {
  /** Shown until the visitor types. Describes the category, not a person. */
  readonly fallback: string;
  readonly className?: string;
}

export function PreparedFor({ fallback, className }: PreparedForProps) {
  const inputId = useId();
  const [value, setValue] = useState('');
  const [committed, setCommitted] = useState('');

  const displayed = committed.trim().length > 0 ? committed : fallback;

  return (
    <div className={cn(className)}>
      <label htmlFor={inputId} data-apparatus="" className="block">
        Prepared for
      </label>

      <input
        id={inputId}
        type="text"
        data-filled={committed.trim().length > 0 ? '' : undefined}
        value={value}
        placeholder={fallback}
        autoComplete="organization"
        enterKeyHint="done"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onBlur={() => {
          setCommitted(value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            setCommitted(value);
            event.currentTarget.blur();
          }
        }}
        className={cn(
          'mt-[var(--rhythm-apparatus)] w-full max-w-[var(--measure-prose)]',
          'min-h-[var(--touch-min)] bg-transparent',
          'border-0 border-b border-[color:var(--rule-color)]',
          'font-[family-name:var(--font-evidence)] text-[length:var(--text-lead)]',
          'placeholder:text-[color:var(--ink-apparatus)]',
          'focus:border-[color:var(--rule-color-emphasis)] focus:outline-none',
          // A completed field reads as completed: the rule under it firms up.
          // Restrained on purpose — the payoff is that the document is now
          // addressed to them, not that something lit up.
          'data-[filled]:border-[color:var(--rule-color-emphasis)]',
        )}
      />

      {/* Announced only once the visitor has finished typing. */}
      <p role="status" aria-live="polite" className="sr-only">
        {committed.trim().length > 0 ? `Brief prepared for ${displayed}` : ''}
      </p>
    </div>
  );
}
