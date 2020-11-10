import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';


const routes: Routes = [
  {
    path: '', 
    component: CidadePesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  },
  {
    path: 'cadastro', 
    component: CidadeCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  },
  {
    path: 'cadastro/:codigo', 
    component: CidadePesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  },

  {
    path: 'cadastro/editar/:codigo', 
    component: CidadeCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CidadesRoutingModule { }
