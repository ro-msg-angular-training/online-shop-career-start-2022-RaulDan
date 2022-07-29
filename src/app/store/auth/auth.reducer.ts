import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Credentials } from "src/app/Credentials";

import * as authReducer from "./auth.actions"

export interface AuthState{
    credentials:Credentials,
    error:string,
    status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState:AuthState={
    credentials:{username:'',password:''},
    error:'',
    status:'pending'
}
export const authentificationReducer=createReducer(
    initialState,

    on(authReducer.Login,(state)=>({
        ...state,
        status:'loading',
        error:''
    })),

    on(authReducer.LoginSuccess,(state,{user})=>({
        ...state,
        user:user,
        status:'success',
        error:''
    })),

    on(authReducer.LoginError,(state,{error})=>({
        ...state,
        status:'error',
        error:error
    })),
)