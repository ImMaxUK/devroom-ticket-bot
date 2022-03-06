/**
 * Copyright (c) 2022-present, Max (github.com/ImMaxUK).
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { log } = require("./utils/log");

log.info("Starting Discord Bot...");

require("fs")
  .readdirSync("./handlers")
  .forEach((file) => {
    if (file.endsWith(".js")) require(`./handlers/${file}`);
  });

log.info("> Loading Events..");

require("fs")
  .readdirSync("./events")
  .forEach((file) => {
    if (file.endsWith(".js")) {
      try {
        require(`./events/${file}`);
        log.info(`>> Loaded event (./events/${file})`);
      } catch (error) {
        log.error(
          `Failed to load event ${file}. **Please report the following error:**`
        );
        log.error(error);
      }
    }
  });