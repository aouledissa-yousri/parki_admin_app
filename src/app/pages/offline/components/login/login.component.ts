import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Credentials } from 'src/app/models/Credentials';
import { HashingService } from 'src/app/services/hashingService/hashing.service';
import { AdminApiService } from '../../../../services/adminApiService/admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form = new FormGroup({})
  loading = true

  constructor(
    private builder: FormBuilder, 
    private adminApi: AdminApiService, 
    private hash: HashingService, 
    private router: Router,
    private alert: AlertController) { }

  ngOnInit() {
    this.initForm()
    this.stopLoading()
  }

  initForm(){
    this.form = this.builder.group({
      user: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  login(){
    let credentials = new Credentials(
      this.form.value["user"],
      this.form.value["user"],
      this.hash.saltPassword(this.form.value["password"])
    )

    this.loading = true

    this.adminApi.login(credentials).subscribe(data => {
      switch(data.message){
        case "success":
          this.getUserData(data)
          this.router.navigate(["dashboard"])
          return
        default: 
          this.showAlert(data.message)
      }

    })

  }


  private stopLoading(){
    let self = this
    setTimeout(() => {
      self.loading = false
    }, 2000)
  }


  async showAlert(message: string){
    let desc = ""
    switch(message){
      case "password is wrong":
        desc = "Your password is wrong please try again"
        break
      case "user not found":
        desc = "Wrong user credentials"
        break 
      case "your account is temporarily blocked please try again later!":
        desc = "your account is blocked temporarily due to multiple failed login attempts"
        break
    }


    await this.alert.create({
      header: message,
      message: desc,
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "alertButton",
          text: "Ok"
        }
      ]
    }).then(box => box.present())
  }

  getUserData(data){
    localStorage.setItem("token", data.token)
    localStorage.setItem("name", data.user.name)
    localStorage.setItem("lastname", data.user.lastname)
    localStorage.setItem("email", data.user.email)
    localStorage.setItem("phoneNumber", data.user.phoneNumber)
    localStorage.setItem("username", data.user.username)
  }
  

}
