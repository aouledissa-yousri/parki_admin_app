import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  routes = [1,0,0]

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
    this.activateRoute(0)
  }

  manageAgents() {
    this.router.navigate(["dashboard/manage_agents"])
    this.activateRoute(1)
  }

  manageAdmins() {
    this.router.navigate(["dashboard/manage_admins"])
    this.activateRoute(2)
  }

  private activateRoute(index: number) {
    for(let i =0; i< this.routes.length; i++){
      if(i != index)
        this.routes[i] = 0
    }
    this.routes[index] = 1
  }

  isActive(index: number){
    return this.routes[index] == 1
  }

  settings(){
    this.router.navigate(["dashboard/account_settings"])
  }

}
