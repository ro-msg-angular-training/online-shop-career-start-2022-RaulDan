import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppAuthState } from '../store/auth/auth.state';
import * as authActions from "../store/auth/auth.actions"
import { Credentials } from '../Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private store:Store<AppAuthState>
  ) { }


  errorMessage:boolean=false

  loginForm=this.fb.group({
    username:[''],
    password:['']
  })


  login():void{
    const username:string=this.loginForm.value['username']!;
    const password:string=this.loginForm.value['password']!;
    const credentials:Credentials={
      username:username,
      password:password
    }
    this.store.dispatch(authActions.Login({credentials}))
    


  }

}
