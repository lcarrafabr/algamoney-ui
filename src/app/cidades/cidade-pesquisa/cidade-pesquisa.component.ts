import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CidadesService, CidadeFiltro } from '../cidades.service';

@Component({
  selector: 'app-cidade-pesquisa',
  templateUrl: './cidade-pesquisa.component.html',
  styleUrls: ['./cidade-pesquisa.component.css']
})
export class CidadePesquisaComponent implements OnInit {

  totalRegistros = 0;
  cidades = [];
  filtro = new CidadeFiltro;
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private cidadesService: CidadesService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private errorHander: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.listarTudo();
  }

  listarTudo() {

    this.cidadesService.listarTodos()
    .then(result => {
      this.cidades = result
    });
  }

  confirmarExclusaoCidade(cidade: any) {

    this.confirmation.confirm({
      message: 'Deseja remover a cidade?',
      accept: () => {
        this.removerCidade(cidade);
      }
    })
  }

  removerCidade(cidade: any) {

    this.cidadesService.removerCidade(cidade.codigo)
    .then(() => {
      this.grid.reset();

      this.toasty.success('Cidade removida com sucesso!');
    })
    .catch(erro => this.errorHander.handle(erro));
  }

}
