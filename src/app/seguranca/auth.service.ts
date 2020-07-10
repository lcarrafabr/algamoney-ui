import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenURL = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=passoword`;

    return this.http.post(this.oauthTokenURL, body, { headers })
    .toPromise()
    .then(response => {
      console.log(response)
    })
    .catch(response => {
      console.log(response)
    })
  }
}
