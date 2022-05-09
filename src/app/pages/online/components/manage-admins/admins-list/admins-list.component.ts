import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AdminApiService } from 'src/app/services/adminApiService/admin-api.service';
import { Admin } from '../../../../../models/Admin';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss'],
})
export class AdminsListComponent implements OnInit {

  admins: Admin[]

  columns = [
    {name: "Name"},
    {name: "Lastname"},
    {name: "Email"},
    {name: "Username"},
    {name: "Phone number"},
  ]

  constructor(private adminApi: AdminApiService, private alert: AlertController, private router: Router) { }

  ngOnInit() {
    this.getAdmins()
  }

  private getAdmins(){
    this.adminApi.getAdmins(localStorage.getItem("workAddress"), localStorage.getItem("username")).subscribe(admins => {
      this.admins = admins
    })
  }

  async deleteConfirmationDialog(id: number){

    await this.alert.create({
      header: "Warning",
      message: "Agent " + String(this.admins[id].username) + " account will be deleted!!!",
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "confirmButton",
          text: "Confirm",
          handler: () => {
            this.delete(id)
          }
        },

        {
          cssClass: "cancelButton",
          text: "Cancel",
        }
      ]
    }).then(box => box.present())

  }

  delete(id: number){
    this.adminApi.deleteAdmin(this.admins[id].username).subscribe(data => {
      this.admins = this.admins.filter(admin => this.admins.indexOf(admin) != id)
      
      if(data.result == "Admin account has been deleted successfully"){
       this.showAlert(data.result, "Success")

      }

    })
  }

  async showAlert(message: string, header){
    await this.alert.create({
      header: header,
      message: message,
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "alertButton",
          text: "Yes",
        },
        
      ]
    }).then(box => box.present())
  }



  createAdmin(){
    this.router.navigate(["dashboard/manage_admins/create_admin"])
  }




}
