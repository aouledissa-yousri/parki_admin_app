import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HashingService } from 'src/app/services/hashingService/hashing.service';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { MunicipalAgent } from '../../../../../models/MunicipalAgent';
import { PrivateAgent } from '../../../../../models/PrivateAgent';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss'],
})
export class CreateAgentComponent implements OnInit {

  form = new FormGroup({})

  constructor(private builder: FormBuilder, private adminApi: AdminApiService, private hash: HashingService, private alert: AlertController, private loadingAlert: LoadingController) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.form = this.builder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: [0, [Validators.required, Validators.min(1)]],
      //type: ["", Validators.required],
      //workAddress: ["", Validators.required]
    })
  }

  createAgent(){
    
    let agent = this.createAgentObject()
    this.showLoadingBox()
    this.adminApi.createMunicipalAgent(agent).subscribe(data => { this.verifyAgentCreationResult(data) })

  }

  createAgentObject(){

    return  new MunicipalAgent(
      this.form.value["name"],
      this.form.value["lastname"],
      this.form.value["username"],
      this.form.value["email"],
      this.form.value["phoneNumber"],
      this.hash.saltPassword("root"),
      "laouina"
    )

    /*if(this.form.value["type"] == "Municipal"){

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
    )*/
  }

  verifyAgentCreationResult(data: any){
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

  async showLoadingBox(){
    await this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    }).then(load => load.present())
  }

  reset(){
    this.initForm()
  }

}
