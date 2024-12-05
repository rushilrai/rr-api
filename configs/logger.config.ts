import {
  ConsoleHandler,
  FileHandler,
  getLogger,
  Logger,
  setup,
} from "@std/log";
import { ensureFileSync } from "@std/fs";

export let LOGGER: Logger;
const LOG_PATH = "./logs/app.log";

export function initLogger() {
  try {
    ensureFileSync(LOG_PATH);

    setup({
      handlers: {
        console: new ConsoleHandler("DEBUG", {
          useColors: true,
        }),

        file: new FileHandler("INFO", {
          filename: "./logs/app.log",
          formatter: (record) =>
            `${record.datetime} -- ${record.levelName}: ${record.msg}`,
        }),
      },

      loggers: {
        default: {
          level: "DEBUG",
          handlers: ["console", "file"],
        },
      },
    });

    LOGGER = getLogger();
  } catch (error) {
    console.error("failed to init logger:", error);
  }
}
