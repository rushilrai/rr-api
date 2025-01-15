import { Resend } from "resend";

import { LOGGER } from "./logger.config.ts";

export let MAILER: Resend;

export async function initResend() {
  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY === undefined) {
      throw new Error("RESEND environment variables not set");
    }

    MAILER = new Resend(RESEND_API_KEY);

    await MAILER.emails.send({
      from: "",
      to: "delivered@resend.dev",
      replyTo: "",
      subject: "Test Email",
      text: "Working",
    });
  } catch (error) {
    LOGGER.error("RESEND test email failed", error);

    throw error;
  }
}
