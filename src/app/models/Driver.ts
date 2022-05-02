import { User } from "./User"
import { Car } from './Car';
import { Transaction } from './Transaction';
import { PaymentLog } from './PaymentLog';

export class Driver extends User {

    constructor(
        public name: string,
        public lastname: string,
        public username: string, 
        public email: string,
        public phoneNumber: string,
        public password: string,
        public cars: Car[],
        public transactions: Transaction[],
        public payments: PaymentLog[]
    ){
        super(name, lastname, username, email, phoneNumber, password);
    }
        

}