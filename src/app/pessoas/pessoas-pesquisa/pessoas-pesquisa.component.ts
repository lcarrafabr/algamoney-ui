import { Component, OnInit, ViewChild } from '@angular/core';

import { PessoaService, PessoaFiltro } from './../pessoa.service';

import { ToastyService } from 'ng2-toasty';
import { Table } from 'primeng/table/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import {ConfirmationService} from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private title: Title
    ) { }

  ngOnInit() {
    //this.pesquisar();
   //this.listarTudo();
   //this.teste();
   this.title.setTitle('Pesquisa de pessoas')
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  listarTudo() {
    this.pessoaService.listarTodos()
    .then(result => this.pessoas = result);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExcluirPessoa(pessoa: any) {

    this.confirmation.confirm({

      message: 'Deseja remover esse registro?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      this.grid.reset();

      this.toasty.success(`${pessoa.nome} foi removido com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
