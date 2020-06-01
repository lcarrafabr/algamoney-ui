import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';


import { LazyLoadEvent } from 'primeng/api/public_api';
import { Table } from 'primeng/table/table';
import { ToastyService } from 'ng2-toasty';

import {MessageService} from 'primeng/api';

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
    private toasty: ToastyService
    ) { }

  ngOnInit() {
    //this.pesquisar();
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();

      this.toasty.success(`Lançamento: ${lancamento.descricao} excluído com sucesso!`);
      //this.toasty.success('Lançamento exluído com sucesso!');
    });
  }

}
