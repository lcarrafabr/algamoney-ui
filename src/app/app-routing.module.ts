import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado-encontrada.component';


const routes: Routes = [

    { path: 'lancamentos', loadChildren: 'src/app/lancamentos/lancamentos.module#LancamentosModule' },
    { path: 'pessoas', loadChildren: 'src/app/pessoas/pessoas.module#PessoasModule' },
    { path: 'dashboard', loadChildren: 'src/app/dashboard/dashboard.module#DashboardModule' },
    { path: 'relatorios', loadChildren: 'src/app/relatorios/relatorios.module#RelatoriosModule' },
    { path: 'usuarios', loadChildren: 'src/app/usuarios/usuarios.module#UsuariosModule' },
    { path: 'categorias', loadChildren: 'src/app/Categorias/categoria.module#CategoriaModule' },
    { path: 'cidades', loadChildren: 'src/app/cidades/cidades.module#CidadesModule' },
  
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ]
  
  
  @NgModule({

    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }