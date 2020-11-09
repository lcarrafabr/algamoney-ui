import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { PesquisarCategoriaComponent } from './pesquisar-categoria/pesquisar-categoria.component';

const routes: Routes = [
    { 
      path: 'categorias', 
      component: PesquisarCategoriaComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_PESQUISAR_CATEGORIA']}
    },
    { 
        path: 'categorias/:codigo', 
        component: CadastroCategoriaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_PESQUISAR_CATEGORIA']}
      }
  ]

@NgModule({

    imports: [
     RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class CategoriaRoutingModule { }