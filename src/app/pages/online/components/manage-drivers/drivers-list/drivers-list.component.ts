import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { Drivers } from '../../../../../models/Drivers';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements OnInit {

  drivers: Drivers
  columns = [
    {name: "id"},
    {name: "Name"},
    {name: "Lastname"},
    {name: "Email"},
    {name: "Username"},
    {name: "Phone number"},
  ]

  constructor(private adminApi: AdminApiService, private alert: AlertController) { }

  ngOnInit() {
    this.getDrivers()
  }

  private getDrivers(){
    this.adminApi.getDrivers().subscribe(drivers => {
      this.drivers = new Drivers(drivers)
    })
  }

  delete(id: number){
    this.adminApi.deleteDriver(this.drivers.getDriver(id).username).subscribe(data => {
      this.showAlert(data.result)
      
      if(data.result == "Driver account has been deketed successfully"){
        this.drivers.deleteDriver(id)
      }

    })
  }

  async showAlert(message: string){
    await this.alert.create({
      header: message,
      message: "",
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "alertButton",
          text: "Ok"
        }
      ]
    }).then(box => box.present())
  }

}
