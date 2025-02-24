import { Resend } from "resend";

export let MAILER: Resend;
export let TEST_EMAIL: string;
export let FROM_EMAIL: string;

export async function initResend() {
  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const RESEND_TEST_EMAIL = Deno.env.get("RESEND_TEST_EMAIL");
    const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL");

    if (
      RESEND_API_KEY === undefined || RESEND_TEST_EMAIL === undefined ||
      RESEND_FROM_EMAIL === undefined
    ) {
      throw new Error("RESEND environment variables not set");
    }

    MAILER = new Resend(RESEND_API_KEY);
    TEST_EMAIL = RESEND_TEST_EMAIL;
    FROM_EMAIL = RESEND_FROM_EMAIL;

    await MAILER.emails.send({
      from: TEST_EMAIL,
      to: "delivered@resend.dev",
      subject: "Test Email",
      text: "Working",
    });

    console.debug("Resend Working");
  } catch (error) {
    console.error("RESEND test email failed", error);

    throw error;
  }
}
