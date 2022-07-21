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
export class LoginComponent implements OnInit {

  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { }


  errorMessage:Boolean=false

  loginForm=this.fb.group({
    username:[''],
    password:['']
  })
  ngOnInit(): void {
  }

  login():void{
    this.authService.login(this.loginForm.value['username']!,this.loginForm.value['password']!).pipe(first())
    .subscribe(data=>{
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
