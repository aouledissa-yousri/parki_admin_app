import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminApiService } from 'src/app/services/adminApiService/admin-api.service';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/Agent';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss'],
})
export class AgentsListComponent implements OnInit {

  agents: Agent[]

  columns = [
    {name: "Name"},
    {name: "Lastname"},
    {name: "Email"},
    {name: "Username"},
    {name: "Phone number"},
  ]

  constructor(private adminApi: AdminApiService, private alert: AlertController, private router: Router) { }

  ngOnInit() {
    this.getAgents()
  }

  private getAgents(){
    this.adminApi.getMunicipalAgents("laouina").subscribe(agents => {
      this.agents = agents
    })
  }

  delete(id: number){
    this.adminApi.deleteAgent(this.agents[id].username).subscribe(data => {
      this.agents = this.agents.filter(agent => this.agents.indexOf(agent) != id)
      
      if(data.result == "Agent account has been deleted successfully"){
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


  createAgent(){
    this.router.navigate(["dashboard/manage_agents/create_agent"])
  }

  async deleteConfirmationDialog(id: number){

    await this.alert.create({
      header: "Warning",
      message: "Agent " + String(this.agents[id].username) + " account will be deleted!!!",
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

}
