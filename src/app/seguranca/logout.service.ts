import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  logout() {
    //console.log('Aqui chega')
   // return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
     // .toPromise()
      //.then(() => {
       // console.log('Aqui não chega')
       // this.auth.limparAccessToken();
      //});
      this.auth.limparAccessToken();
  }
}
