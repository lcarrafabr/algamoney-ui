import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/Categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  //lancamento = new Lancamento();
  formulario: FormGroup;

  uploadEmAndamento= false;

  dataVencimento: Date;
  dataPagamento: Date;

  exibindoFormularioCategoria = false;
  exibindoFormularioPessoa = false;

  constructor(private categoriaService: CategoriaService,
      private pessoaService: PessoaService,
      private lancamentoService: LancamentoService,
      private toasty: ToastyService,
      private errorhandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {

    this.configurarFormulario();

    this.title.setTitle('Cadastro de lançamentos')

   /* console.log(this.route.snapshot.params['codigo'])*/

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.listarPessoas();

    this.dataVencimento = new Date(this.dataVencimento);
    this.dataPagamento = new Date(this.dataPagamento);

  }

  configurarFormulario() {

    this.formulario = this.formBuilder.group({
      codigo: [],
      tipoLancamento: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      //descricao: [null, [Validators.required, Validators.minLength(5) ]],
      descricao: [null, [this.validarObrigatoriedade, Validators.minLength(5) ]],
      valor: [null, Validators.required],

      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []

    });
  }

  validarObrigatoriedade(input: FormControl) {

    //const dtVencimento = input.root.get('dataVencimento').value;

    //console.log(input.root.get('dataVencimento').value);

    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {

    return (input: FormControl) => {
      return (!input.value || input.value.lenght >= valor) ? null : { tamanhoMinimo: { tamanho: valor } }
    };
  }

  get editando() {
    //return Boolean(this.lancamento.codigo);
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {

    this.lancamentoService.buscaPorCodigo(codigo)
    .then(lancamento => {
      //this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
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

  salvar() {

    if (this.editando) {
      this.atualizarlancamento();
    } else {
      this.adicionarLancamento();
    }

  }

  adicionarLancamento() {
    
    this.lancamentoService.adicionar(this.formulario.value)
    .then(lancamentoAdicionado => {
      this.toasty.success('Lançamento cadastrado com sucesso!')

      //console.log(this.formulario.get('dataVencimento'));

      //form.reset();
      //this.lancamento = new Lancamento();

      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorhandler.handle(erro));
  }

  atualizarlancamento() {

    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {
      //this.lancamento = lancamento;
      console.log('to aQUI');

      this.formulario.patchValue(lancamento);
      

      this.toasty.success('Lancamento atualizado com sucesso!');

      this.atualizarTituloEdicao();
    })
    .catch(erro => {
      this.errorhandler.handle(erro);
      console.log(erro);
    });
  }

  novo() {
    
    //form.reset();
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1)
    
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamentos: ${this.formulario.get('descricao').value}`)
  }

  get urlUploadAnexo() {

    return this.lancamentoService.urlUploadAnexo();
  }

  antesUploadAnexo() {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {

    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });
    this.uploadEmAndamento = false;
  }

  erroUpload(event) {

    this.toasty.error('Erro ao tentar enviar o anexo.');
    this.uploadEmAndamento = false;
  }

  get nomeAnexo() {

    const nome = this.formulario.get('anexo').value;

    if(nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.lenght);
    }

    return '';
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  cadastrarCategoria() {

    this.exibindoFormularioCategoria = true;
  }

  atualizarCategorias() {

    this.carregarCategorias();
  }

  cadastrarPessoa() {

    this.exibindoFormularioPessoa = true;
  }

  atualizarComboPessoa() {

    this.listarPessoas();
  }

}
