import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/Admin';
import { AdminApiService } from 'src/app/services/adminApiService/admin-api.service';
import { HashingService } from 'src/app/services/hashingService/hashing.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {

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
    })
  }

  createAdmin(){

    let admin = new Admin(
      this.form.value["name"],
        this.form.value["lastname"],
        this.form.value["username"],
        this.form.value["email"],
        this.form.value["phoneNumber"],
        this.hash.saltPassword("root"),
    )

    this.adminApi.createAdminAccount(admin).subscribe(data => {
      if(data.result){
        console.log("admin account created successfully")
        this.initForm()
      }
      else 
        console.log("admin account creation failed")
    })
  }
}
