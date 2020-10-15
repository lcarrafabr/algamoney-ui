import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
   // .then(() => {
      //console.log('cheguei aqui poha')
     // this.router.navigate(['/login'])
    //})
    //.catch(erro => this.errorHandler.handle(erro));
    //this.router.navigate(['/login']);
  }

}
