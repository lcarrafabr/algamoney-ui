import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Cidade } from 'src/app/core/model';
import { CidadesService } from '../cidades.service';

@Component({
  selector: 'app-cidade-cadastro',
  templateUrl: './cidade-cadastro.component.html',
  styleUrls: ['./cidade-cadastro.component.css']
})
export class CidadeCadastroComponent implements OnInit {

  @Input() cadastro = true;

  estados: any[];
  estadoSelecionado: number;
  cidade = new Cidade;

  nomeCidade: string;

  constructor(
    private cidadeService: CidadesService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoCidade = this.route.snapshot.params['codigo']

    if(codigoCidade != undefined) {
      this.carregarCamposCidade(codigoCidade);
    }

    this.carregarEstados();
  }

  get editando() {
    return Boolean(this.cidade.codigo);
  }

  salvar(form: NgForm) {

    if(this.editando) {
      this.atualizarCidade()
    
    } else {
      this.adicionarCidade(form);
    }
  }

  atualizarCidade() {

    this.cidadeService.atulizarCidade(this.cidade)
    .then(cidade => {
      this.cidade = cidade;
      this.toasty.success('Cidade atualizada com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEstados() {

    this.cidadeService.listarEstados()
    .then(lista => {

      this.estados = lista.map(uf => ({label: uf.nome, value: uf.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarCidade(form: NgForm) {

    this.cidadeService.adicionar(this.cidade)
    .then(() => {
      this.toasty.success('Cidade cadastrada com sucesso!');

      form.reset();
      this.cidade = new Cidade;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCamposCidade(codigo: number) {

    this.cidadeService.buscaCidadePorId(codigo)
    .then(cidade => {
      this.cidade = cidade;
    })
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de ${this.cidade}`)
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.cidade = new Cidade();
    }.bind(this), 1);

    this.router.navigate(['/cidades/cadastro']);
  }

}
