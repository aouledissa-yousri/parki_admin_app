import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MunicipalityZone } from '../../../../../models/MunicipalityZone';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-create-municipal-zone',
  templateUrl: './create-municipal-zone.component.html',
  styleUrls: ['./create-municipal-zone.component.scss'],
})
export class CreateMunicipalZoneComponent implements OnInit {

  form = new FormGroup({})

  constructor(
    private router: Router, 
    private builder: FormBuilder, 
    private adminApi: AdminApiService, 
    private loadingAlert: LoadingController,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.form = this.builder.group({
      municipality: ["", Validators.required],
      pricePerHour: [0, [Validators.required, Validators.min(10)]],
      address: ["", Validators.required],
    })
  }

  back(){
    this.router.navigate(["dashboard/manage_municipal_car_zones"])
  }

  createMunicipalZone(){
    this.showLoadingBox()
    let municipalityZone = new MunicipalityZone(
      this.form.value["municipality"],
      this.form.value["address"],
      this.form.value["pricePerHour"],
      []
    )

    this.adminApi.createMunicipalityZone(municipalityZone).subscribe(data => {
      if(data.result == "Municipality zone created successfully"){
        this.showAlert(data.result, "Success")
        this.initForm()
      }
      else 
        this.showAlert(data.result, "Failure")
    })
  }

  async showLoadingBox(){
    await this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    }).then(load => load.present())
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


}
