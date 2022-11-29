import { Model } from "sequelize";

export default interface VehicleInterface extends Model{
    id: number,
    make: string, 
    model: string, 
    state: string
}