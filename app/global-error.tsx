'use client';

import '@/styles/globals.css';

/**
 * Global error boundary. Replaces the root layout, so it must render its own
 * html and body and cannot rely on providers.
 */
export default function GlobalError({ reset }: { readonly reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: '2rem', maxWidth: '40rem' }}>
          <h1>The site failed to load</h1>
          <p>Something went wrong before the page could render.</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
