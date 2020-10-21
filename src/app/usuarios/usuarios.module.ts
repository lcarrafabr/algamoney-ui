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
import {PickListModule} from 'primeng/picklist';
import { UsuarioCadastroPermissaoComponent } from './usuario-cadastro-permissao/usuario-cadastro-permissao.component';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [
    UsuarioPesquisaComponent, 
    UsuarioCadastroComponent, 
    UsuarioCadastroPermissaoComponent
  ],
  imports: [
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    PickListModule,
    PanelModule,

    SharedModule,

    CommonModule,
    UsuariosRoutingModule
  ],
  exports: [
    UsuarioPesquisaComponent,
    UsuarioCadastroComponent,
    UsuarioCadastroPermissaoComponent
  ]
})
export class UsuariosModule { }
