import { AuthToken } from './../models/auth-token';
import { DevrantService } from './../services/devrant.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthResponse } from './../models/auth-response';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  
    constructor(public http: Http,
              public devrantService: DevrantService) {
    }

    login(email: string, password: string): Promise<any> {
        let authResponse: AuthResponse;

        return this.devrantService.login(email, password).then(response => {
          authResponse = response.json();
          //console.log("AuthResponse : " + JSON.stringify(response));
          if (authResponse.success) {
            let authToken: AuthToken = authResponse.auth_token;
            localStorage.setItem("auth_token", JSON.stringify(authToken));
              Promise.resolve(authResponse.auth_token);
          }
        }).catch((error) => {
            console.log(error);
            Promise.reject(error);
        });
    }

    checkLoggedIn(): boolean {
        let authToken: AuthToken = JSON.parse(localStorage.getItem("auth_token"));
        if (authToken) {        //TODO: also check if token expired
            return true;
        }
      return false;
    }
  
    getLocalToken(): AuthToken {
      let authToken: AuthToken;
      if (localStorage.getItem("auth_token")) {
        authToken = JSON.parse(localStorage.getItem("auth_token"));
        return authToken;
      }
    }
}
