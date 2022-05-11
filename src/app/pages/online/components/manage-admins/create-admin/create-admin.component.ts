import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/Admin';
import { AdminApiService } from 'src/app/services/adminApiService/admin-api.service';
import { HashingService } from 'src/app/services/hashingService/hashing.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {

  form = new FormGroup({})

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
  }

  private initForm(){
    this.form = this.builder.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: [0, [Validators.required, Validators.min(10000000), Validators.max(99999999)] ],
    })
  }

  createAdmin(loading: any){

    let admin = new Admin(
      this.form.value["name"],
      this.form.value["lastname"],
      this.form.value["username"],
      this.form.value["email"],
      this.form.value["phoneNumber"],
      this.hash.saltPassword("root"),
      localStorage.getItem("workAddress")
    )

    this.adminApi.createAdminAccount(admin).subscribe(data => {
      loading.dismiss()
      if(data.result == "Admin account created successfully"){
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

  reset(){
    this.initForm()
  }

  submitAdminData(id){
    let loadingIndicator = this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })

    loadingIndicator.then(loading => {
      loading.present()
      this.createAdmin(loading)
    })
  }

  back(){
    this.router.navigate(["dashboard/manage_admins"])
  }
}
