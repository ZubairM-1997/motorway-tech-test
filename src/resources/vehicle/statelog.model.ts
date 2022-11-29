import { Sequelize, DataTypes, Model } from "sequelize";

export class Statelog extends Model {}


function createStateLogModel(dbConnection?: Sequelize) {
  if (dbConnection){
    return Statelog.init(
      {
        vehicleId: {
          type: DataTypes.NUMBER,
          allowNull: false,
          primaryKey: true
        },
        state: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        timestamp: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        sequelize: dbConnection, // We need to pass the connection instance
        modelName: "stateLogs", // We need to choose the model name
      }
    );

  }
}

export default createStateLogModel;
