import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [LoginFormComponent],
  imports: [

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),

    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    LoginFormComponent
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
