import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  loadingElement: Promise<HTMLIonLoadingElement>

  constructor(private loadingAlert: LoadingController, private alert: AlertController) { }

  async deleteConfirmationDialog(id: number, operation){

    await this.alert.create({
      header: "Warning",
      message: "Parking Lot " + String(id) + " Data will be deleted!!!",
      cssClass: "dialogue-content",
      buttons: [
        {
          cssClass: "confirmButton",
          text: "Confirm",
          handler: () => {
            this.showLoadingBox()
            operation(id)
          }
        },

        {
          cssClass: "cancelButton",
          text: "Cancel",
        }
      ]
    }).then(box => box.present())

  }


  async showLoadingBox(){
    await this.loadingAlert.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    }).then(load => load.present())
  }


  async resultAlert(message: string, header){
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

  
}
