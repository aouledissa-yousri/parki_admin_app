import { Car } from "./Car";

export class ParkingLot {
    constructor(
        public address: string,
        public name: string,
        public nbPlaces: number,
        public nbAvailablePlaces: string,
        public cars: Car[]
    ){}
}