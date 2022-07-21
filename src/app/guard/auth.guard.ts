import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
     const url: string = state.url;
     return this.checkLogin(url);
  }
  checkLogin(url:string):true|UrlTree{
    if(this.authService.isLoggedIn){
      return true;
    }
    this.authService.redirectUrl = url;
    return this.router.parseUrl('/login');
  }
  
}
