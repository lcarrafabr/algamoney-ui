import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ToastyModule } from 'ng2-toasty';

import { NgxCurrencyModule } from "ngx-currency";

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    ToastyModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [LancamentoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
