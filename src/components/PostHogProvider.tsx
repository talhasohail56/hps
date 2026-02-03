"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_fy7v3sL8sTyHQZTh8zZqj3oc7QfUbDtLaPVt1Izy8ZK", {
      api_host: "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // we capture manually below
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
