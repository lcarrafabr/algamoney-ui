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

    return this.http.post(this.oauthTokenURL, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      console.log(response)

     this.armazenarToken(response['access_token'])

     //console.log('Verifica: ' + this.armazenarToken(response['access_token'].access_token))
    })
    .catch(response => {
      console.log(response)

      const responseError  = response.response.error;

      if (response.status === 400) {
        if (responseError.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida');
        }
      }
      return Promise.reject(response);
    });
  }

  temPermissao(permissao: string) {

    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if(this.temPermissao(role)){
        return true;
      }
    }

    return false;
  }

  obterNovoAccessToken(): Promise<void> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenURL, body, { headers, withCredentials: true } )
    .toPromise()
    .then(response => {

      this.armazenarToken(response['access_token']);
      console.log('Novo Access Tokem Criado')
      return Promise.resolve(null);
    })
    .catch(response => {
      console.log('Erro ao renovar Token.', response);
      return Promise.resolve(null);
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayLoad = null;
  }

  isAccessTokenInvalido() {

    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
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
