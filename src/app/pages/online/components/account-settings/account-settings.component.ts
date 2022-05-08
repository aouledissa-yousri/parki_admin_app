import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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

  constructor(private builder: FormBuilder, private alert: AlertController, private hash: HashingService, private adminApi: AdminApiService) { }

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
      ""
    )

    this.initForm(this.admin)
  }

  updateAccount(){

    if(this.form.value["password"] == ""){
      this.showAlert("You must enter your new or current password to update your account data", "Error")
      return
    }

    this.admin = new Admin(
      this.form.value["name"],
      this.form.value["lastname"],
      this.form.value["username"],
      this.form.value["email"],
      this.form.value["phoneNumber"],
      this.hash.saltPassword(this.form.value["password"]),
    )


    this.adminApi.updateAdminAccount(this.admin).subscribe(data => {
      if(data.result == "account data has been updated successfully"){
        this.updateUserData(this.admin)
        this.showAlert(data.result, "Success")
      }
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
          text: "Ok"
        }
      ]
    }).then(box => box.present())
  }

  reset(){
    this.initForm(new Admin("","","","","",""))
  }

}
