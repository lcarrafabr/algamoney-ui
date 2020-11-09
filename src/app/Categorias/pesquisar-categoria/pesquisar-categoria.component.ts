import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService, categoriasFiltro } from '../categoria.service';

@Component({
  selector: 'app-pesquisar-categoria',
  templateUrl: './pesquisar-categoria.component.html',
  styleUrls: ['./pesquisar-categoria.component.css']
})
export class PesquisarCategoriaComponent implements OnInit {

  categorias = [];
  totalRegistros = 0;
  filtro = new categoriasFiltro()
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private categoriaService: CategoriaService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private errorHander: ErrorHandlerService
  ) { }

  ngOnInit() {

    this.listarTudo();
  }

  listarTudo() {

    this.categoriaService.listarTodas()
    .then(result => {

      this.categorias = result;
    });
  }

  confirmaExclusaoCategoria(categoria: any) {

    this.confirmation.confirm({
      message: 'Deseja remover essa categoria?',
      accept: () => {
        this.removerCategoria(categoria);
      }
    })
  }

  removerCategoria(categoria: any) {

    this.categoriaService.excluirCategoria(categoria)
    .then(() => {
      this.grid.reset();

      this.toasty.success(`A categoria foi removido com sucesso`)
    })
    .catch(erro => this.errorHander.handle(erro));
  }


}
