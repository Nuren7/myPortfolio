import app from "./app";
import { initDb } from "./db/init";
import { config } from "./config";

(async () => {
  await initDb();

  app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`);
  });
})();