import { createAction,props } from "@ngrx/store";
import { Credentials } from "src/app/Credentials";
import { UserInterface } from "src/Users";

export enum LoginActionTypes{

    Login='[Login] Login',
    LoginSuccess='[Login] Login Success',
    LoginError='[Login] Login Error'
}


export const Login=createAction(
    LoginActionTypes.Login,
    props<{credentials:Credentials}>()

)

export const LoginSuccess=createAction(
    LoginActionTypes.LoginSuccess,
    props<{user:UserInterface}>()
)

export const LoginError=createAction(
    LoginActionTypes.LoginError,
    props<{error:string}>()  
)