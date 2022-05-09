import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/adminApiService/admin-api.service';
import { Violation } from '../../../../../models/Violation';

@Component({
  selector: 'app-violations-list',
  templateUrl: './violations-list.component.html',
  styleUrls: ['./violations-list.component.scss'],
})
export class ViolationsListComponent implements OnInit {

  username: string
  carSerialNumber: string
  loading= true
  violations: Violation[]

  columns = [
    {name: "Type"},
    {name: "description"},
    {name: "Date"},
    {name: "Fine"},
    {name: "Status"},
    {name: "Deadline"}
  ]

  constructor(private router: Router, private route: ActivatedRoute, private adminAPi: AdminApiService) { }

  ngOnInit() {
    this.username = this.route.snapshot.params["username"]
    this.carSerialNumber = this.route.snapshot.params["carSerialNumber"]
    this.getViolations()
  }

  getViolations(){
    this.violations = JSON.parse(sessionStorage.getItem("driver")).cars.filter(car => car.carSerialNumber == this.carSerialNumber)[0].violations

    if(this.violations == null){
      this.adminAPi.getDriverData(this.username).subscribe(driver => {
        this.violations = driver.getCar(this.carSerialNumber)
      })
    }

    this.loading = false
    console.log(this.violations)

  }

  back(){
    this.router.navigate(["../"])
  }

  payments(){
    this.router.navigate(["dashboard/manage_drivers/payments", this.username])
  }

  carList(){
    this.router.navigate(["dashboard/manage_drivers/cars", this.username])
  }


}
