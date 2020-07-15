import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRenokeUrl: 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }
}
