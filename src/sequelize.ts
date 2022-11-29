import * as pg from "pg";
import { Sequelize } from "sequelize";

export interface DbConf {
  port: number;
  host: string;
  username: string;
  password: string;
  db_name: string;
}

export function createDbConnection(conf: DbConf) {
  return new Sequelize(conf.db_name, conf.username, conf.password, {
    host: conf.host,
    dialect: "postgres",
    dialectModule: pg,
    port: conf.port,
  });
}

