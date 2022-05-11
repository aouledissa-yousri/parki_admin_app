import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("lastname")
    localStorage.removeItem("email")
    localStorage.removeItem("phoneNumber")
    localStorage.removeItem("name")
    localStorage.removeItem("token")
    localStorage.removeItem("workAddress")
    this.router.navigate([""])
  }

  getUsername(){
    return localStorage.getItem("username")
  }

  manageDrivers() {
    this.router.navigate(["dashboard/manage_drivers"])
  }

  manageAgents() {
    this.router.navigate(["dashboard/manage_agents"])
  }

  manageAdmins() {
    this.router.navigate(["dashboard/manage_admins"])
  }

  manageParkingLots(){
    this.router.navigate(["dashboard/manage_parking_lots"])
  }

  manageMunicipalCarZones(){
    this.router.navigate(["dashboard/manage_municipal_car_zones"])
  }


  isActive(route: string){
    return this.router.url == route
  }

  settings(){
    this.router.navigate(["dashboard/account_settings"])
  }

}
