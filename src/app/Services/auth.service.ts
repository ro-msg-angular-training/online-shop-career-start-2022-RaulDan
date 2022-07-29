import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/environments/environment';
import { map, Observable, tap } from 'rxjs';
import { UserInterface } from 'src/Users';
import { Role } from 'src/Users';
import { Credentials } from '../Credentials';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient
  ) { }

  isAdmin:boolean|undefined;
  isUser:boolean|undefined;
  isCustomer:boolean|undefined;
  isLoggedIn=false;
  redirectUrl:string|null=null
  user:UserInterface | null=null
  
 
  public login(credentials:Credentials):Observable<UserInterface>{
   
   
    return this.httpClient.post<UserInterface>(backendURL+'login',  credentials )
            .pipe(map(user => {
              
                localStorage.setItem("isLoggedIn",'true')
                this.user=user
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
