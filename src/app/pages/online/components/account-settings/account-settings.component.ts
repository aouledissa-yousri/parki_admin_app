import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Admin } from '../../../../models/Admin';
import { HashingService } from '../../../../services/hashingService/hashing.service';
import { AdminApiService } from '../../../../services/adminApiService/admin-api.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {

  form = new FormGroup({})
  admin: Admin

  constructor(private builder: FormBuilder, private alert: AlertController, private hash: HashingService, private adminApi: AdminApiService, private loadingAlert: LoadingController) { }

  ngOnInit() {
    this.getAdminData()
  }

  private initForm(admin: Admin){
    this.form = this.builder.group({
      name: [admin.name, Validators.required],
      lastname: [admin.lastname, Validators.required],
      username: [admin.username, Validators.required],
      email: [admin.email, Validators.required],
      phoneNumber: [admin.phoneNumber, [Validators.required, Validators.min(1)]],
      password : [""]
    })
  }

  getAdminData(){
    this.admin = new Admin(
      localStorage.getItem('name'),
      localStorage.getItem('lastname'),
      localStorage.getItem('username'),
      localStorage.getItem('email'),
      localStorage.getItem('phoneNumber'),
      "",
      localStorage.getItem("workAddress")
    )

    this.initForm(this.admin)
  }

  updateAccount(loading: any){

    if(this.form.value["password"] == ""){
      this.showAlert("You must enter your new or current password to update your account data", "Error")
      loading.dismiss()
      return
    }


    this.admin = new Admin(
      this.form.value["name"],
      this.form.value["lastname"],
      this.form.value["username"],
      this.form.value["email"],
      this.form.value["phoneNumber"],
      this.hash.saltPassword(this.form.value["password"]),
      localStorage.getItem("workAddress")
    )


    this.adminApi.updateAdminAccount(this.admin).subscribe(data => {
      loading.dismiss()
      if(data.result == "account data has been updated successfully"){
        this.updateUserData(this.admin)
        this.showAlert(data.result, "Success")
      }else 
        this.showAlert(data.result, "Failure")
    })
  }


  private updateUserData(admin: Admin){
    localStorage.removeItem("name")
    localStorage.removeItem("lastname")
    localStorage.removeItem("email")
    localStorage.removeItem("phoneNumber")
    localStorage.removeItem("username")

    localStorage.setItem("name", admin.name)
    localStorage.setItem("lastname", admin.lastname)
    localStorage.setItem("email", admin.email)
    localStorage.setItem("phoneNumber", admin.phoneNumber)
    localStorage.setItem("username", admin.username)
  }

  async showAlert(message: string, header: string){
    await this.alert.create({
      header: header,
      message: message,
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "alertButton",
          text: "Ok",
        }
      ]
    }).then(box => box.present())
  }

  reset(){
    this.initForm(new Admin("","","","","","",""))
  }

  submitAdminData(){
    let loadingIndicator = this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })

    loadingIndicator.then(loading => {
      loading.present()
      this.updateAccount(loading)
    })
  }

}
