import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser'
import errorMiddleware from "./middleware/error.middleware";
import helmet from "helmet";
import { createDbConnection, DbConf } from "./sequelize";
import { Sequelize } from "sequelize";
import VehicleController from "./resources/vehicle/vehicle.controller";

export interface AppConfig {
  db: DbConf;
}

class App {
  public express: Application;
  public config: AppConfig;
  public dbClient?: Sequelize;

  constructor(config: AppConfig) {
    this.express = express();
    this.config = config;

    this.initialiseMiddleWare();
    this.initialiseErrorHandling();
  }

  private initialiseMiddleWare(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(dbClient: Sequelize): void {
    const vehicleController = new VehicleController(dbClient);
    this.express.use(`/api`, vehicleController.router);

  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  private async initialiseDatabaseConnection(): Promise<Sequelize | undefined> {
    try {
      const sequelize = await createDbConnection(this.config.db);
      await sequelize.authenticate();
      this.dbClient = sequelize;
      console.log("Database connection has been established successfully.");
      return sequelize;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public async init(): Promise<void> {
    try {
      const dbClient = await this.initialiseDatabaseConnection();
      if (dbClient) {
        await this.initialiseControllers(dbClient);
      } else {
        throw Error("failed to initializa the application");
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async listen(port: number): Promise<void> {
    // initialize the app
    await this.init();
    this.express.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}

export default App;
