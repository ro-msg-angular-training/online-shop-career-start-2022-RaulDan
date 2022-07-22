import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }


  errorMessage:boolean=false

  loginForm=this.fb.group({
    username:[''],
    password:['']
  })


  login():void{
    const username:string=this.loginForm.value['username']!;
    const password:string=this.loginForm.value['password']!
    this.authService.login(username,password).pipe(first())
    .subscribe(()=>{
      this.errorMessage=false;
      this.router.navigate(['/products'])
      
    },
    error=>{
      if(error.status===401){
        this.errorMessage=true
      }
    })
  }

}
