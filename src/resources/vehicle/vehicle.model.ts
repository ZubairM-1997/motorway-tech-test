import { Sequelize, DataTypes, Model, Optional } from "sequelize";

type VehicleAttributes = {
  id: number;
  make: string;
  model: string;
  state: string;
  // other attributes...
};

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type VehicleCreationAttributes = Optional<VehicleAttributes, "id">;

export class Vehicle extends Model<
  VehicleAttributes,
  VehicleCreationAttributes
> {
  declare id: number;
  declare make: string;
  declare model: string;
  declare state: string;
}

function createVehicleModel(dbConnection: Sequelize) {
  Vehicle.init(
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      timestamps: false,
      sequelize: dbConnection, // We need to pass the connection instance
      modelName: "vehicles", // We need to choose the model name
    }
  );
  return Vehicle;
}

export default createVehicleModel;
