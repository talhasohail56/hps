"use client";

import { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

/* Grep this tag in the browser console to spot a missing site key. */
const MISSING_KEY_TAG = "[ReCaptchaProvider] RECAPTCHA_SITE_KEY_MISSING";

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      // Loud on purpose. This used to fail silently, which let the
      // contact form break in production without anyone noticing.
      console.error(
        `${MISSING_KEY_TAG} NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set, so no reCAPTCHA provider is mounted. ` +
          `Forms will submit unverified. NEXT_PUBLIC_ vars are inlined at build time — set it in the deployment ` +
          `environment and redeploy.`
      );
    }
  }, [siteKey]);

  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
