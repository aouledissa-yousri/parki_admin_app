import { Component, OnInit } from '@angular/core';
import { ParkingLot } from 'src/app/models/ParkingLot';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-parking-lots-list',
  templateUrl: './parking-lots-list.component.html',
  styleUrls: ['./parking-lots-list.component.scss'],
})
export class ParkingLotsListComponent implements OnInit {

  parkingLots: ParkingLot[]
  loading = true
  operationLoading = false

  columns = [
    {name: "Address"},
    {name: "Name"},
    {name: "Capacity"},
  ]

  constructor(private router: Router, private adminApi: AdminApiService, private alert: AlertController, private loadingAlert: LoadingController) { }

  ngOnInit() {
    this.getParkingLots()
  }

  createParkingLot(){
    this.router.navigate(["dashboard/manage_parking_lots/create_parking_lot"])
  }

  back(){
    this.router.navigate(["dashboard/manage_parking_lots"])
  }

  getParkingLots(){
    this.adminApi.getParkingLots().subscribe(data => {
      this.parkingLots = data
      console.log(this.parkingLots)
      this.loading = false
    })
  }


  delete(id: number, loading: any){
    this.adminApi.deleteParkingLot(this.parkingLots[id].address).subscribe(data => {
      this.parkingLots = this.parkingLots.filter(parkingLot => this.parkingLots.indexOf(parkingLot) != id)
      
      if(data.result == "Parking Lot has been deleted successfully")
       this.showAlert(data.result, "Success")
      else 
        this.showAlert(data.result, "Failure")
      loading.dismiss()
      

    })
  }

  async deleteConfirmationDialog(id: number){

    await this.alert.create({
      header: "Warning",
      message: "Parking Lot " + String(this.parkingLots[id].name) + " Data will be deleted!!!",
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
