import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';


const routes: Routes = [
  { 
    path: '', 
    component: UsuarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  },
  { 
    path: 'cadastro', 
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
