import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentLog } from 'src/app/models/PaymentLog';
import { AdminApiService } from '../../../../../services/adminApiService/admin-api.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  username: string
  loading = true
  payments: PaymentLog[]

  columns = [
    {name: "Date"},
    {name: "Paid amount"},
    {name: "Object"},
    {name: "Payment method"},
  ]

  constructor(private router: Router, private route: ActivatedRoute, private adminAPi: AdminApiService) { }

  ngOnInit() {
    this.username = this.route.snapshot.params["username"]
    this.getPaymentLogs()
  }


  getPaymentLogs(){
    this.payments = JSON.parse(sessionStorage.getItem("driver")).payments

    if(this.payments == null){
      this.adminAPi.getDriverData(this.username).subscribe(driver => {
        this.payments = driver.payments
      })
    }

    this.loading = false

  }

  back(){
    this.router.navigate(["../"])
  }

  carList(){
    this.router.navigate(["dashboard/manage_drivers/cars", this.username])
  }

}
