import VehicleInterface from "../../utils/interfaces/vehicle.interface";
import StateLogInterface from "../../utils/interfaces/statelog.interface";
import createVehicleModel, { Vehicle } from "./vehicle.model";
import createStateLogModel, { Statelog } from "./statelog.model";
import { Sequelize } from "sequelize";
import VehicleInfo from "../../utils/interfaces/vehicleInfo.interface";

class VehicleService {
  private stateLog = Statelog;
  private vehicleModel = Vehicle;
  private dbClient: Sequelize;

  public constructor(dbClient: Sequelize) {
    createVehicleModel(dbClient);
    createStateLogModel(dbClient)
    
    this.dbClient = dbClient;
  }

  public async getVehicleInfo(
    vehicleId: string,
    timestamp: string
  ): Promise<VehicleInfo> {
    console.log(vehicleId, timestamp)
    try {
      const vehicle = (await this.vehicleModel.findOne({
        where: { id: vehicleId },
      })) as VehicleInterface;
      
      const stateLogs = (await this.stateLog.findAll({
        where: {
          vehicleId: vehicleId,
          timestamp: timestamp
        }
      })) as StateLogInterface[]
      console.log(stateLogs)

      const resp : VehicleInfo = {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        status: [] 
      }

      stateLogs.forEach((stateLog) => {
        resp.status.push({
          state: stateLog.state,
          timestamp: stateLog.timestamp
        })
      }) 


      return resp
    } catch (error) {
      throw new Error("Unable to find vehicle");
    }
  }

  // public async getVehicleList(): Promise<VehicleInterface[]> {
  //   try {
  //     const [vehicleList] = (await this.dbClient.query(
  //       "SELECT * FROM vehicles"
  //     )) as [Vehicle[], any];

  //     return vehicleList;
  //   } catch (error) {
  //     console.log(error);
  //     // throw new Error("Unable to find vehicle");
  //     return [];
  //   }
  // }
}

export default VehicleService;
