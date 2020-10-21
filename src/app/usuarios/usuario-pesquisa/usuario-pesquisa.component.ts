import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
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
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private usuarioService: UsuarioService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private errorHander: ErrorHandlerService
  ) { }

  ngOnInit() {

    this.listarTudo();
  }

  listarTudo() {
    this.usuarioService.listarTodosusuarios()
    .then(result => this.usuarios = result);
  }

  confirmarExclusaousuario(usuario: any) {
    this.confirmation.confirm({
      message: 'Deseja remover o registro?',
      accept: () => {
        this.excluirUsuario(usuario);
      }
    });
  }

  excluirUsuario(usuario: any) {

    this.usuarioService.excluirUsuario(usuario.codigo)
    .then(() => {
      this.grid.reset();

      this.toasty.success(`O usuário ${usuario.nome} foi removido com sucesso!`)
    })
    .catch(erro => this.errorHander.handle(erro));
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.usuarioService.pesquisar(this.filtro)
    .then(resultado => {
      this.usuarios = resultado
    })
  }

}
