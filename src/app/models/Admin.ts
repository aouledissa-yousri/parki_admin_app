import { User } from "./User";

export class Admin extends User {
    
    constructor(
        public name: string,
        public lastname: string,
        public username: string, 
        public email: string,
        public phoneNumber: string,
        public password: string,
        public workAddress: string
    ){
        super(name, lastname, username, email, phoneNumber, password)
    }
}