import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/models/Credentials';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/Agent';
import { Admin } from 'src/app/models/Admin';
import { Driver } from 'src/app/models/Driver';
import { MunicipalityZone } from '../../models/MunicipalityZone';
import { ParkingLot } from '../../models/ParkingLot';

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

  getDriverData(username: string): Observable<Driver>{
    return this.http.get<Driver>(URL+"/manageUsers/getDriverData/"+username)
  }



  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(URL+"/manageUsers/getDrivers/")
  }

  getPrivateAgents(workAddress: string): Observable<Agent[]> {
    return this.http.get<Agent[]>(URL+"/manageUsers/getPrivateAgents/"+ workAddress)
  }

  getMunicipalAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(URL+"/manageUsers/getMunicipalAgents/")
  }

  getAdmins(username: string): Observable<any> {
    return this.http.post(URL+"/manageUsers/getAdmins/", {"username": username})
  }
  

  getAccountData(username: string): Observable<any> {
    return this.http.get(URL+"manageUsers/getAdminData/"+username)
  }




  //deleting accounts
  deleteDriver(username: string): Observable<any> {
    return this.http.post(URL+"/manageUsers/deleteDriver/", {"username": username})
  }

  deleteAgent(username: string): Observable<any> {
    return this.http.post(URL+"/manageUsers/deleteAgent/", {"username": username})
  }

  deleteAdmin(username: string): Observable<any> {
    return this.http.post(URL+"/manageUsers/deleteAdmin/", {"username": username})
  }





  //updating accounts
  updateAdminAccount(admin: Admin): Observable<any> {
    return this.http.post(URL+"/manageUsers/updateAdminAccount/", {"newData": admin, "currentUsername": localStorage.getItem("username")})
  }




  //getting parking spaces data 

  getAvailableWorkPlaces(): Observable<any> {
    return this.http.get<any>(URL+"/manageCarSpaces/getAvailableWorkPlaces/")
  }

  getMunicipalityZones(): Observable<MunicipalityZone[]> {
    return this.http.get<MunicipalityZone[]>(URL+"/manageCarSpaces/getMunicipalityZones/")
  }

  getParkingLots(): Observable<ParkingLot[]> {
    return this.http.get<ParkingLot[]>(URL+"/manageCarSpaces/getParkingLots/")

  }


  //creating car spaces 

  createParkingLot(parkingLot: ParkingLot): Observable<any> {
    return this.http.post(URL+"/manageCarSpaces/createParkingLot/", parkingLot)
    
  }

  createMunicipalityZone(parkingLot: MunicipalityZone): Observable<any> {
    return this.http.post(URL+"/manageCarSpaces/createMunicipalityZone/", parkingLot)
  }

  //deleting car spaces 

  deleteParkingLot(address: string): Observable<any> {
    return this.http.post(URL+'/manageCarSpaces/deleteParkingLot/', {"address": address})
  }

  deleteMunicipalityZone(address: string): Observable<any> {
    return this.http.post(URL+'/manageCarSpaces/deleteMuncipalityZone/', {"address": address})
  }



}
