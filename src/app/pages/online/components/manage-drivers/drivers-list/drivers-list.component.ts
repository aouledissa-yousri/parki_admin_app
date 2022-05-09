import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements OnInit {

  drivers: Driver[]
  columns = [
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
      this.drivers = drivers
    })
  }

  delete(id: number){
    this.adminApi.deleteDriver(this.drivers[id-1].username).subscribe(data => {
      this.drivers = this.drivers.filter(driver => this.drivers.indexOf(driver) != id)

      if(data.result == "Driver account has been deleted successfully"){
        this.showAlert(data.result, "Success")
      }

    })
  }

  async showAlert(message: string, header){
    await this.alert.create({
      header: header,
      message: message,
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "alertButton",
          text: "Yes",
        },
        
      ]
    }).then(box => box.present())
  }

  async deleteConfirmationDialog(id: number){

    await this.alert.create({
      header: "Warning",
      message: "Driver " + String(this.drivers[id].username) + " account will be deleted!!!",
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "confirmButton",
          text: "Confirm",
          handler: () => {
            this.delete(id)
          }
        },

        {
          cssClass: "cancelButton",
          text: "Cancel",
        }
      ]
    }).then(box => box.present())

  }

}
