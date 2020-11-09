import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CidadesRoutingModule } from './cidades-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [CidadePesquisaComponent],
  imports: [
    CommonModule,
    CidadesRoutingModule,
    SharedModule,
    FormsModule,
    
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CardModule
  ]
})
export class CidadesModule { }
