import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/adminApiService/admin-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private adminApi: AdminApiService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return new Observable<any>(observable => {
        this.adminApi.checkTokenValidity(localStorage.getItem("token")).subscribe(data => {
        if(data.result == "valid token")
          observable.next(true)
        else 
          this.router.navigate([""])


        })
      })
      
  }
  
}
