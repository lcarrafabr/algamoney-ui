import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from './../shared/shared.module';



@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    InputTextModule,
    ButtonModule,
    TooltipModule,
    InputMaskModule,
    CardModule,
    TableModule
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ]
})
export class PessoasModule { }