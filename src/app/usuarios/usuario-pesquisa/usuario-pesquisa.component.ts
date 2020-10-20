import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { UsuarioService, UsuarioFiltro } from '../usuario.service';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  totalRegistros = 0;
  usuarios = [];
  filtro = new UsuarioFiltro();

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.listarTudo();
  }

  listarTudo() {
    this.usuarioService.listarTodosusuarios()
    .then(result => this.usuarios = result);
  }

}
