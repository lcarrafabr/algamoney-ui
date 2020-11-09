import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { PesquisarCategoriaComponent } from './pesquisar-categoria/pesquisar-categoria.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PesquisarCategoriaComponent,
    CadastroCategoriaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,

    SharedModule,

    CategoriaRoutingModule
  ],
  exports: [
    PesquisarCategoriaComponent,
    CadastroCategoriaComponent
  ]
})
export class CategoriaModule { }
