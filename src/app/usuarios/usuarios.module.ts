import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from './../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    UsuarioPesquisaComponent, 
    UsuarioCadastroComponent
  ],
  imports: [
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,

    SharedModule,

    CommonModule,
    UsuariosRoutingModule
  ],
  exports: [
    UsuarioPesquisaComponent,
    UsuarioCadastroComponent
  ]
})
export class UsuariosModule { }
