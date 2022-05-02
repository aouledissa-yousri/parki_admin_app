import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/models/Credentials';
import { Observable } from 'rxjs';

const URL = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<any>{
    return this.http.post(URL + "/login/adminLogin/", credentials)
  }
}
