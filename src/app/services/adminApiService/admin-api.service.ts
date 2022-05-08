import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/models/Credentials';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/Agent';
import { Admin } from 'src/app/models/Admin';
import { Driver } from 'src/app/models/Driver';

const URL = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  //login
  login(credentials: Credentials): Observable<any>{
    return this.http.post(URL + "/login/adminLogin/", credentials)
  }

  //creation
  createPrivateAgent(agent: Agent): Observable<any>{
    return this.http.post(URL + "/manageUsers/createPrivateAgent/", agent)
  }

  createMunicipalAgent(agent: Agent): Observable<any>{
    return this.http.post(URL + "/manageUsers/createMunicipalAgent/", agent)
  }

  createAdminAccount(admin: Admin): Observable<any>{
    return this.http.post(URL + "/manageUsers/createAdminAccount/", admin)
  }


  //check if acces token is valid
  checkTokenValidity(token: string): Observable<any>{
    return this.http.get<string>(URL+"/login/checkTokenValidity/"+token)
  }

  //getting user data
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(URL+"/manageUsers/getDrivers/")
  }

  getAccountData(username: string): Observable<any> {
    return this.http.get(URL+"manageUsers/getAdminData/"+username)
  }

  //deleting accounts
  deleteDriver(username: string): Observable<any> {
    return this.http.post(URL+"/manageUsers/deleteDriver/", {"username": username})
  }

  //updating accounts
  updateAdminAccount(admin: Admin): Observable<any> {
    return this.http.post(URL+"/manageUsers/updateAdminAccount/", {"newData": admin, "currentUsername": localStorage.getItem("username")})
  }




}
