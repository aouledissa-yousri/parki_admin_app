import { Violation } from "./Violation";

export class Car {
    constructor(
        public carSerialNumber: string,
        public brand: string,
        public model: string,
        public color: string,
        public driver: number,
        public violations: Violation[]
    ){}
}