import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as authActions from './auth.actions'
import { AuthService } from "src/app/Services/auth.service";
import { of, from } from "rxjs";
import { Injectable } from "@angular/core";
import { Credentials } from "src/app/Credentials";
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { UserInterface } from "src/Users";

@Injectable()
export class AuthEffects {

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    loginUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(authActions.Login),
            mergeMap(({ credentials }) => {
                return this.authService.login(credentials).pipe(
                    map((user: UserInterface) => authActions.LoginSuccess({ user })),
                    catchError((error) => of(authActions.LoginError({ error })))
                );
            })
        )
    )

    loginUserSuccess$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(authActions.LoginSuccess),
                tap(() => {
                    this.router.navigateByUrl('/products');
                })
            ),
        { dispatch: false }
    );

    loginUserError$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(authActions.LoginError),
                tap(() => alert('The credentials you introduced do not exist!'))
            ),
        { dispatch: false }
    );


}