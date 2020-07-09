import { ConfirmationService } from 'primeng/api';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { ToastyModule } from 'ng2-toasty';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { RouterModule } from '@angular/router';



registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ConfirmDialogModule,
    ToastyModule,
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,

    ConfirmationService,
    ErrorHandlerService,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
