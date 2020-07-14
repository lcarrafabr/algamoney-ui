import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/Categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
      private pessoaService: PessoaService,
      private lancamentoService: LancamentoService,
      private toasty: ToastyService,
      private errorhandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
    ) { }

  ngOnInit() {


    this.title.setTitle('Cadastro de lançamentos')

   /* console.log(this.route.snapshot.params['codigo'])*/

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.listarPessoas();

  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {

    this.lancamentoService.buscaPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorhandler.handle(erro));
  }


  carregarCategorias() {

    this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => {
        return {label: c.nome, value: c.codigo}
      });
    })
    .catch(erro => this.errorhandler.handle(erro));
  }

  listarPessoas() {

    //this.pessoaService.listarTodos()
    this.pessoaService.pesquisarTodos()
    .then(pessoas => {
      this.pessoas = pessoas.map( p => {
        return {label:p.nome , value: p.codigo}
      });
    })
    .catch(erro => this.errorhandler.handle(erro));
  }

  salvar(form: FormControl) {

    if (this.editando) {
      this.atualizarlancamento(form);
    } else {
      this.adicionarLancamento(form);
    }

  }

  adicionarLancamento(form: FormControl) {
    
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.toasty.success('Lançamento cadastrado com sucesso!')

      //form.reset();
      //this.lancamento = new Lancamento();

      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorhandler.handle(erro));
  }

  atualizarlancamento(form: FormControl) {

    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;

      this.toasty.success('Lancamento atualizado com sucesso!');

      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorhandler.handle(erro));
  }

  novo(form: FormControl) {
    
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1)
    
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamentos: ${this.lancamento.descricao}`)
  }

}
