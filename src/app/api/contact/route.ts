import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

/* Grep this tag in Vercel logs to spot a broken reCAPTCHA setup. */
const RECAPTCHA_SKIPPED_TAG = "[contact] RECAPTCHA_SKIPPED";
const FORMSPREE_URL = "https://formspree.io/f/xbdkpwqr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recaptchaToken, ...formData } = body;

    /* ---- Verify reCAPTCHA, but never lose a lead over it ----------- *
     * Verification only blocks a submission when it actually ran and
     * came back negative. If it cannot run at all — no token, no secret,
     * Google unreachable — we log loudly and accept the lead. A missing
     * key must not silently cost us customers, which is exactly what
     * happened before.                                                  */
    let verification = "verified";

    if (!recaptchaToken) {
      console.error(
        `${RECAPTCHA_SKIPPED_TAG} no token supplied (site key likely missing in this environment) — accepting submission unverified`
      );
      verification = "skipped: no token";
    } else if (!RECAPTCHA_SECRET) {
      console.error(
        `${RECAPTCHA_SKIPPED_TAG} RECAPTCHA_SECRET_KEY is not set — accepting submission unverified`
      );
      verification = "skipped: no server secret";
    } else {
      try {
        const verifyRes = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: RECAPTCHA_SECRET,
              response: recaptchaToken,
            }),
          }
        );

        const verifyData = await verifyRes.json();

        // Verification ran and says this is a bot — this is the one case
        // that still blocks.
        if (!verifyData.success || verifyData.score < 0.5) {
          console.warn(
            "[contact] reCAPTCHA failed:",
            JSON.stringify({
              success: verifyData.success,
              score: verifyData.score,
            })
          );
          return NextResponse.json(
            { error: "reCAPTCHA verification failed. Please try again." },
            { status: 403 }
          );
        }
      } catch (err) {
        // Google unreachable or a malformed response: infrastructure
        // trouble, not a bot signal.
        console.error(
          `${RECAPTCHA_SKIPPED_TAG} verification request failed — accepting submission unverified:`,
          err
        );
        verification = "skipped: verifier unreachable";
      }
    }

    /* ---- Forward to Formspree ---- */
    const formspreeRes = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, "Spam Verification": verification }),
    });

    if (!formspreeRes.ok) {
      console.error(
        "[contact] Formspree error:",
        formspreeRes.status,
        await formspreeRes.text()
      );
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
