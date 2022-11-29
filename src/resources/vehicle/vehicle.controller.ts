import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleWare";
import validate from "./vehicle.validation";
import VehicleService from "./vehicle.service";
import { Sequelize } from "sequelize";

export default class VehicleController implements Controller {
  public path = "/vehicles";
  public router = Router();
  private VehicleService;

  constructor(dbConnection: Sequelize) {
    this.initialiseRoutes();
    this.VehicleService = new VehicleService(dbConnection);
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}/:vehicleId`,
      validationMiddleware(validate.get),
      this.get
    );
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    
      const { timestamp } = req.body;
      const { vehicleId } = req.params as { vehicleId: string };
    
    if (!/^-?\d+$/.test(vehicleId)){
      return res.status(400).json({
        message: `${vehicleId} is not in the correct format`
      })
    }

    try {
      const vehicleInfo = await this.VehicleService.getVehicleInfo(
        vehicleId,
        timestamp
      );

      if (vehicleInfo){
        res.status(200).json({
          vehicleInfo,
        });
      } else {
        res.status(404).json({
          message: "Vehicle not found"
        });
      }
      
    } catch (error) {
      next(new HttpException(500, "Internal Error occured"));
    }
  }
}

