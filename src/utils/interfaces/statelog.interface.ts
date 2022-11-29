import { Model } from "sequelize";

export default interface StateLogInterface extends Model {
    vehicleId: number,
    state: string,
    timestamp: string
}
