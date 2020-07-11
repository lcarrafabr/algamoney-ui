import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenURL = 'http://localhost:8080/oauth/token';
  jwtPayLoad: any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { 
      this.carregarToken();
    }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenURL, body, { headers })
    .toPromise()
    .then(response => {
      console.log(response)

     this.armazenarToken(response['access_token'])
    })
    .catch(response => {
      console.log(response)
    })
  }

  private armazenarToken(token: string) {

    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {

    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
