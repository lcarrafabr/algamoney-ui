import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Categoria } from 'src/app/core/model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent implements OnInit {

  @Input() cadastro = true;

  categoria = new Categoria;
  codigoCategoria: number;

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {

    this.title.setTitle('Cadastro de categorias')

    const codigoCategoria2 = this.route.snapshot.params['codigo']

    //console.log(codigoCategoria2)

    if(codigoCategoria2 != 'cadastro' && codigoCategoria2 != null) {
      this.carregarCategoria(codigoCategoria2);
    }
    
  }

  get editando() {
    return Boolean(this.categoria.codigo);
  }

  salvar(form: NgForm) {

    if(this.editando) {

      this.atualizarCategoria()
    
    } else {

      this.adicionar(form);
    }
  }

  carregarCategoria(codigo: number) {

    this.categoriaService.buscaPorId(codigo)
    .then(categoria => {
      this.categoria = categoria;
    })
    
  }

  adicionar(form: NgForm) {

    this.categoriaService.adicionar(this.categoria)
    .then(() => {

      this.toasty.success('Categoria cadastrada com sucesso!');

      form.reset();
      this.categoria = new Categoria;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCategoria() {

    this.categoriaService.atualizarCategoria(this.categoria)
    .then(categoria => {
      this.categoria = categoria;

      this.toasty.success('Categoria atualziada com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de ${this.categoria}`)
  }

}
