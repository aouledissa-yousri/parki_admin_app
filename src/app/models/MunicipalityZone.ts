import { Car } from "./Car";

export class MunicipalityZone {
    constructor(
        public municipality: string,
        public address: string,
        public pricePerHour: number,
        public cars: Car[]
    ){}
}