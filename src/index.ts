import "dotenv/config";

import App, { AppConfig } from "./app";

const config: AppConfig = {
  db: {
    port: Number(process.env.DB_PORT),
    host: String(process.env.HOST),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    db_name: String(process.env.DB_NAME),
  },
};

const app = new App(config);

app.listen(Number(process.env.PORT));
