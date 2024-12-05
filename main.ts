import { initLogger, LOGGER } from "./configs/logger.config.ts";

function main() {
  initLogger();

  LOGGER.debug("rr-api");
}

main();
