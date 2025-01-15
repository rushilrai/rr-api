import { InfisicalSDK } from "@infisical/sdk";

import { LOGGER } from "./logger.config.ts";

export async function connectToInfisical() {
  try {
    const INFISICAL_ENV = Deno.env.get("INFISICAL_ENV");
    const INFISICAL_PROJECT_ID = Deno.env.get("INFISICAL_PROJECT_ID");
    const INFISICAL_CLIENT_ID = Deno.env.get("INFISICAL_CLIENT_ID");
    const INFISICAL_CLIENT_SECRET = Deno.env.get("INFISICAL_CLIENT_SECRET");

    if (
      INFISICAL_ENV === undefined ||
      INFISICAL_PROJECT_ID === undefined ||
      INFISICAL_CLIENT_SECRET === undefined ||
      INFISICAL_CLIENT_ID === undefined
    ) {
      throw new Error("INFISICAL environment variables not set");
    }

    const client = new InfisicalSDK();

    await client.auth().universalAuth.login({
      clientId: INFISICAL_CLIENT_ID,
      clientSecret: INFISICAL_CLIENT_SECRET,
    });

    const secrets = await client.secrets().listSecrets({
      environment: INFISICAL_ENV,
      projectId: INFISICAL_PROJECT_ID,
    });

    secrets.secrets.forEach((secret) => {
      Deno.env.set(secret.secretKey, secret.secretValue);
    });

    LOGGER.debug("Retreived Secrets from Infisical");
  } catch (error) {
    LOGGER.error("Could not retrieve secrets from Infisical", error);

    throw error;
  }
}
