/** Ambient declarations. Keep this file small; prefer explicit imports. */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SITE_URL?: string;
    readonly NEXT_PUBLIC_GTM_ID?: string;
    readonly PAGESPEED_API_KEY?: string;
  }
}
