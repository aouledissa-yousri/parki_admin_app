export class PaymentLog {
    constructor(
        public date: string,
        public paidAmount: string,
        public object: string,
        public paymentMethod: string
    ){}
}