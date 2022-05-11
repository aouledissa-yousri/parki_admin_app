import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ParkingLot } from '../../../../../models/ParkingLot';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';

@Component({
  selector: 'app-create-parking-lot',
  templateUrl: './create-parking-lot.component.html',
  styleUrls: ['./create-parking-lot.component.scss'],
})
export class CreateParkingLotComponent implements OnInit {

  form = new FormGroup({})
  

  constructor(
    private builder: FormBuilder, 
    private router: Router, 
    private adminApi: AdminApiService, 
    private loadingAlert: LoadingController,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.form = this.builder.group({
      address: ["", Validators.required],
      name: ["", Validators.required],
      nbPlaces: [0, Validators.required],
    })
  }

  back(){
    this.router.navigate(["dashboard/manage_parking_lots"])
  }

  reset(){
    this.initForm()
  }

  createParkingLot(loading: any){
    let parkingLot = new ParkingLot(
      this.form.value["address"],
      this.form.value["name"],
      this.form.value["nbPlaces"],
      this.form.value["nbPlaces"],
      []
    )
    this.adminApi.createParkingLot(parkingLot).subscribe(data => {
      loading.dismiss()
      if(data.result == "Parking Lot created successfully"){
        this.showAlert(data.result, "Success")
        this.initForm()
      }
      else 
        this.showAlert(data.result, "Failure")

    })
    
  }

  async showAlert(message: string, header: string){
    await this.alert.create({
      header: header,
      message: message,
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "alertButton",
          text: "Ok"
        }
      ]
    }).then(box => box.present())
  }

  
  submitParkingLotData(){
    let loadingIndicator = this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })

    loadingIndicator.then(loading => {
      loading.present()
      this.createParkingLot(loading)
    })
  }

}
