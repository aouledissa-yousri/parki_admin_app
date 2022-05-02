import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(private builder: FormBuilder, private adminApi: AdminApiService, private hash: HashingService) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
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

    this.adminApi.login(credentials).subscribe(data => {
      console.log(data)
      this.initForm()
    })

  }

}
