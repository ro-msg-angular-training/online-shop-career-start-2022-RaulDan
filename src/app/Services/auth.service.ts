import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/utils';
import { map } from 'rxjs';
import { UserInterface } from 'src/Users';
import { Role } from 'src/Users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient
  ) { }

  isAdmin:Boolean|undefined;
  isUser:Boolean|undefined;
  isCustomer:Boolean|undefined;
  isLoggedIn=false;
  redirectUrl:string|null=null


  public login(username:string,password:string){
   
    return this.httpClient.post<UserInterface>(backendURL+'login', { username, password })
            .pipe(map(user => {
              
                localStorage.setItem("isLoggedIn",'true')
                this.isLoggedIn=true
                user.roles.includes(Role.admin) ? this.isAdmin=true : this.isAdmin=false;
                user.roles.includes(Role.customer) ? this.isCustomer=true : this.isCustomer=false;
                user.roles.includes(Role.user) ? this.isUser=true : this.isUser=false
                sessionStorage.setItem('isAdmin',this.isAdmin.toString())
                sessionStorage.setItem('isUser',this.isUser.toString()),
                sessionStorage.setItem('isCustomer',this.isCustomer.toString())
                return user;
            }));
  }    
}
