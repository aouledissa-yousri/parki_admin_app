export class Violation {
    constructor(
        public type: string,
        public description: string,
        public date: string,
        public fine: number,
        public status: string,
        public deadLine: string,
    ){}
}