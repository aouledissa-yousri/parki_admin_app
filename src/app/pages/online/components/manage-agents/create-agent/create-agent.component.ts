import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HashingService } from 'src/app/services/hashingService/hashing.service';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { MunicipalAgent } from '../../../../../models/MunicipalAgent';
import { PrivateAgent } from '../../../../../models/PrivateAgent';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss'],
})
export class CreateAgentComponent implements OnInit {

  form = new FormGroup({})

  constructor(private builder: FormBuilder, private adminApi: AdminApiService, private hash: HashingService) { }

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
      type: ["", Validators.required],
      workAddress: ["", Validators.required]
    })
  }

  createAgent(){
    
    let agent = this.createAgentObject()

    if(this.form.value["type"] == "Municipal")
      this.adminApi.createMunicipalAgent(agent).subscribe(data => { this.verifyAgentCreationResult(data) })
    else
      this.adminApi.createPrivateAgent(agent).subscribe(data => { this.verifyAgentCreationResult(data) })

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

  verifyAgentCreationResult(data: any){
    if(data.result){
      console.log("agent created successfully")
      this.initForm()
    }
    else 
      console.log("agent account creation failed")
  }

}
