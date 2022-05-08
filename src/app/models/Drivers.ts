import { Driver } from "./Driver";

export class Drivers {

    private drivers = []

    constructor(drivers: Driver[]){
        for(let i=0; i< drivers.length; i++){
            this.drivers.push({
                id: i + 1,
                name: drivers[i].name,
                lastname: drivers[i].lastname,
                username: drivers[i].username,
                email: drivers[i].email,
                phoneNumber: drivers[i].phoneNumber
            })
        }
    }

    public getDriver(id: number){
        return this.drivers[id-1]
    }

    public getDrivers(){
        return this.drivers
    }

    public deleteDriver(id: number){
        this.drivers.splice(id-1,1)
    }
}