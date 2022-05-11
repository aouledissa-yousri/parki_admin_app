import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
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
  loading = true

  columns = [
    {name: "Name"},
    {name: "Lastname"},
    {name: "Email"},
    {name: "Username"},
    {name: "Phone number"},
  ]

  constructor(private adminApi: AdminApiService, private alert: AlertController, private router: Router, private loadingAlert: LoadingController) { }

  ngOnInit() {
    this.getAgents()
  }

  private getAgents(){
    this.adminApi.getMunicipalAgents().subscribe(agents => {
      this.agents = agents
      this.loading = false
    })
  }

  delete(id: number, loading){
    this.adminApi.deleteAgent(this.agents[id].username).subscribe(data => {
      this.agents = this.agents.filter(agent => this.agents.indexOf(agent) != id)
      
      loading.dismiss()
      if(data.result == "Agent account has been deleted successfully")
       this.showAlert(data.result, "Success")
      else 
        this.showAlert(data.result, "Failure")
      

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
          text: "OK",
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
            this.showLoadingBox(id)
          }
        },

        {
          cssClass: "cancelButton",
          text: "Cancel",
        }
      ]
    }).then(box => box.present())

  }

  showLoadingBox(id){
    let loadingIndicator = this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })

    loadingIndicator.then(loading => {
      loading.present()
      this.delete(id, loading)
    })
  }
  

}
