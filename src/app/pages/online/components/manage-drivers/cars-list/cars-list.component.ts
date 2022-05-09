import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/Car';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';
import { Violation } from '../../../../../models/Violation';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent implements OnInit {

  username: string
  loading = true
  cars: Car[]

  columns = [
    {name: "Serial number"},
    {name: "Brand"},
    {name: "Model"},
    {name: "Color"},
  ]


  constructor(private route: ActivatedRoute, private adminApi: AdminApiService, private router: Router) { }

  ngOnInit() {
    this.username = this.route.snapshot.params["username"]
    this.getCars()
  }

  getCars(){
    this.adminApi.getDriverData(this.username).subscribe(driver => {
      this.cars = driver.cars
      sessionStorage.setItem("driver", JSON.stringify(driver))
      this.loading = false
    })
  }

  
  back(){
    this.router.navigate(["../"])
  }

  payments(){
    this.router.navigate(["dashboard/manage_drivers/payments", this.username])
  }

  violations(id: number){
    this.router.navigate(["dashboard/manage_drivers/cars/violations", this.username, this.cars[id].carSerialNumber])
  }

}
