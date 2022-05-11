import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements OnInit {

  loading = true
  drivers: Driver[]
  
  columns = [
    {name: "Name"},
    {name: "Lastname"},
    {name: "Email"},
    {name: "Username"},
    {name: "Phone number"},
  ]

  constructor(private adminApi: AdminApiService, private alert: AlertController, private loadingAlert: LoadingController, private router: Router) { }

  ngOnInit() {
    this.getDrivers()
  }

  private getDrivers(){
    this.adminApi.getDrivers().subscribe(drivers => {
      this.drivers = drivers
      this.loading = false
    })
  }

  delete(id: number, loading: any){
    this.adminApi.deleteDriver(this.drivers[id].username).subscribe(data => {
      this.drivers = this.drivers.filter(driver => this.drivers.indexOf(driver) != id)
      loading.dismiss()
      if(data.result == "Driver account has been deleted successfully")
        this.showAlert(data.result, "Success")
      else 
        this.showAlert(data.result, "Failure")

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
          text: "Ok",
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
            this.showLoadingBox(id)
          }
        },

        {
          cssClass: "cancelButton",
          text: "Cancel",
        }
      ]
    }).then(box => box.present())

  }

  seeMore(id: number){
    this.router.navigate(["dashboard/manage_drivers/cars", this.drivers[id].username])
  }

  showLoadingBox(id){
    let loadingIndicator = this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })

    loadingIndicator.then(loading => {
      loading.present()
      this.delete(id, loading)
    })
  }
  

}
