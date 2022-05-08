import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/models/Credentials';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/Agent';
import { Admin } from 'src/app/models/Admin';

const URL = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<any>{
    return this.http.post(URL + "/login/adminLogin/", credentials)
  }

  createPrivateAgent(agent: Agent): Observable<any>{
    return this.http.post(URL + "/manageAgents/createPrivateAgent/", agent)
  }

  createMunicipalAgent(agent: Agent): Observable<any>{
    return this.http.post(URL + "/manageAgents/createMunicipalAgent/", agent)
  }

  createAdminAccount(admin: Admin): Observable<any>{
    return this.http.post(URL + "/manageAgents/createAdminAccount/", admin)
  }

  checkTokenValidity(token: string): Observable<any>{
    return this.http.get<string>(URL+"/login/checkTokenValidity/"+token)
  }


}
