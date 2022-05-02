import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  image = {
    src: "",
    height: 0, 
    width: 0
  }

  constructor() { }

  ngOnInit() {
    this.initImage()
  }

  private initImage(){
    this.image.src = "assets/parki.png",
    this.image.height = 300
    this.image.width = 250
  }

}
