import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxCurrencyModule } from "ngx-currency";

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { SegurancaModule } from './seguranca/seguranca.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { JwtHttpInterceptor } from './seguranca/money-http-interceptors';
import { CadastroCategoriaComponent } from './Categorias/cadastro-categoria/cadastro-categoria.component';
import { CategoriaModule } from './Categorias/categoria.module';

@NgModule({
  declarations: [
    AppComponent,
    //CadastroCategoriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    DashboardModule,
    RelatoriosModule,
    CategoriaModule,
    
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
