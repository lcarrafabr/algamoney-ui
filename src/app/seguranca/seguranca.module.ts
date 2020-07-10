import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    LoginFormComponent
  ]
})
export class SegurancaModule { }
