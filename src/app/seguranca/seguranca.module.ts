import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttpInterceptor } from './money-http-interceptors';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { environment } from 'src/environments/environment';




export function tokenGetter(): string {
  return localStorage.getItem('token');
}



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    
    CardModule,
    InputTextModule,
    ButtonModule,
 // Abaixo é o codigo antes de ir para produção
 JwtModule.forRoot({
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: ['localhost:8080'],
    disallowedRoutes: ['http://localhost:8080/oauth/token']
  }
})

    // Abaixo é o codigo antes de ir para produção
/*     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.tokenWhitelistedDomains,
        disallowedRoutes: environment.tokenBlackListdRoutes
      }
    }) */

  ],
  exports: [
    LoginFormComponent
  ],
  providers: [JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
