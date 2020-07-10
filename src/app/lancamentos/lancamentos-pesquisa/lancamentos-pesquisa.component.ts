import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';
import {ConfirmationService} from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
    ) { }

  ngOnInit() {
    //this.pesquisar();
    this.title.setTitle('Pesquisa de lançamentos')
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {

    this.confirmation.confirm({
      message: 'Deseja remover o lançamento?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();

      this.toasty.success(`Lançamento: ${lancamento.descricao} excluído com sucesso!`);
      //this.toasty.success('Lançamento exluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
