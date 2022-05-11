import { Component, OnInit } from '@angular/core';
import { MunicipalityZone } from '../../../../../models/MunicipalityZone';
import { Router } from '@angular/router';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-municipal-zones-list',
  templateUrl: './municipal-zones-list.component.html',
  styleUrls: ['./municipal-zones-list.component.scss'],
})
export class MunicipalZonesListComponent implements OnInit {

  municipalZones: MunicipalityZone[]
  loading = true

  columns = [
    {name: "Municipality"},
    {name: "Address"},
    {name: "Hour Cost"},
  ]

  constructor(private router: Router, private adminApi: AdminApiService, private alert: AlertController, private loadingAlert: LoadingController) { }

  ngOnInit() {
    this.getMunicipalityZones()
  }

  createMunicipalZone(){
    this.router.navigate(["dashboard/manage_municipal_car_zones/create_municipal_zone"])
  }

  back(){
    this.router.navigate(["../"])
  }

  getMunicipalityZones(){
    this.adminApi.getMunicipalityZones().subscribe(data => {
      this.municipalZones = data
      this.loading = false
    })
  }

  delete(id: number, loading){
    this.adminApi.deleteMunicipalityZone(this.municipalZones[id].address).subscribe(data => {
      this.municipalZones = this.municipalZones.filter(municipalZone => this.municipalZones.indexOf(municipalZone) != id)
      
      if(data.result == "Municipality zone has been deleted successfully")
       this.showAlert(data.result, "Success")
      else 
        this.showAlert(data.result, "Failure")
      loading.dismiss()
    })
  }

  async deleteConfirmationDialog(id: number){

    await this.alert.create({
      header: "Warning",
      message: "Municipal zonet " + String(id+1) + " Data will be deleted!!!",
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
          text: "OK",
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
