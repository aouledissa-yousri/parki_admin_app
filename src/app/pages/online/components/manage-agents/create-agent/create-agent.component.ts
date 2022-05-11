import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HashingService } from 'src/app/services/hashingService/hashing.service';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { MunicipalAgent } from '../../../../../models/MunicipalAgent';
import { PrivateAgent } from '../../../../../models/PrivateAgent';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss'],
})
export class CreateAgentComponent implements OnInit {

  form = new FormGroup({})
  workPlaces = []

  constructor(
    private builder: FormBuilder, 
    private adminApi: AdminApiService,
    private hash: HashingService, 
    private alert: AlertController, 
    private loadingAlert: LoadingController, 
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm()
    this.getAvailableWorkPlaces()
  }

  private initForm(){
    this.form = this.builder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: [0, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      type: ["", Validators.required],
      workAddress: ["", Validators.required]
    })
  }

  createAgent(loading: any){
    
    let agent = this.createAgentObject()
    this.adminApi.createMunicipalAgent(agent).subscribe(data => { this.verifyAgentCreationResult(data, loading) })

  }

  createAgentObject(){

  

    if(this.form.value["type"] == "Municipal"){

      return  new MunicipalAgent(
        this.form.value["name"],
        this.form.value["lastname"],
        this.form.value["username"],
        this.form.value["email"],
        this.form.value["phoneNumber"],
        this.hash.saltPassword("root"),
        this.form.value["workAddress"]
      )

    }
    
    return new PrivateAgent(
      this.form.value["name"],
      this.form.value["lastname"],
      this.form.value["username"],
      this.form.value["email"],
      this.form.value["phoneNumber"],
      this.hash.saltPassword("root"),
      this.form.value["workAddress"]
    )
    
  }

  verifyAgentCreationResult(data: any, loading){
    loading.dismiss()
    if(data.result){
      this.showAlert(data.result, "Success")
      this.initForm()
    }
    else 
      this.showAlert(data.result, "Failure")
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

  submitAgentData(){
    let loadingIndicator = this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })

    loadingIndicator.then(loading => {
      loading.present()
      this.createAgent(loading)
    })
  }

  reset(){
    this.initForm()
  }

  back(){
    this.router.navigate(["dashboard/manage_agents"])
  }


  getAvailableWorkPlaces(){
    this.adminApi.getAvailableWorkPlaces().subscribe(data => {
      sessionStorage.setItem("parkingLots", this.getParkingLotsAddresses(data.parkingLots))
      sessionStorage.setItem("municipalityZones", this.getMunicipalityZones(data.municipalityZones))
    })
  }

  getWorkPlaces(){
    if(this.form.value["type"] == "Municipal")
      this.workPlaces = JSON.parse(sessionStorage.getItem("municipalityZones"))
    else 
      this.workPlaces = JSON.parse(sessionStorage.getItem("parkingLots"))
  }

  private getParkingLotsAddresses(parkingLots: any){
    let result = []
    for(let i=0; i<parkingLots.length; i++)
      result.push(parkingLots[i].address)
    return JSON.stringify(result)
  }

  private getMunicipalityZones(municipalityZones: any){
    let result = []
    for(let i=0; i<municipalityZones.length; i++)
      result.push(municipalityZones[i].municipality)
    return JSON.stringify(result)
  }

}
