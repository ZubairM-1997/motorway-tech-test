export default interface VehicleInfo {
    id: number,
    make: string, 
    model: string, 
    status: Status[]
}

interface Status {
    state: string | null,
    timestamp: string | null

}