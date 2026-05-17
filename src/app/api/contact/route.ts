import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const FORMSPREE_URL = "https://formspree.io/f/xbdkpwqr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recaptchaToken, ...formData } = body;

    /* ---- Verify reCAPTCHA token ---- */
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    if (!RECAPTCHA_SECRET) {
      console.error("[contact] RECAPTCHA_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

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

    if (!verifyData.success || verifyData.score < 0.5) {
      console.warn(
        "[contact] reCAPTCHA failed:",
        JSON.stringify({ success: verifyData.success, score: verifyData.score })
      );
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 403 }
      );
    }

    /* ---- Forward to Formspree ---- */
    const formspreeRes = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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
