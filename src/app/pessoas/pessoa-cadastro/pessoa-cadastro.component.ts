import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgForm } from '@angular/forms';
import { Contato, Pessoa } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;
  
  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit() {

    this.title.setTitle('Cadastro de pessoas')

    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }


  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: NgForm) {

    if (this.editando) {
      
      this.atualizarPessoa(form);
    
    } else {
      this.adicionarPessoa(form);
    }

  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa cadastrada com sucesso!');

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm ) {
      
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;

      this.toasty.success('Pessoa atualizada com sucesso!');

      this.atualizarTituloEdicao()
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;

      this.estadoSelecionado = (this.pessoa.endereco.cidade) ? this.pessoa.endereco.cidade.estado.codigo : null;

      if(this.estadoSelecionado) {
        this.pesquisarCidades();
      }


      this.atualizarTituloEdicao()
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de ${this.pessoa}`)
  }

  carregarEstados() {

    this.pessoaService.listarEstados()
    .then(lista => {
      this.estados = lista.map(uf => ({label: uf.nome, value: uf.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarCidades() {

    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
    .then(lista => {
      this.cidades = lista.map(c => ({label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
