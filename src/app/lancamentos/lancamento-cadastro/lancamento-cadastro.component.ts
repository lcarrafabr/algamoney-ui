import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { FormControl } from '@angular/forms';

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
      private errorhandler: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.listarPessoas();
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

    this.pessoaService.listarTodos()
    .then(pessoas => {
      this.pessoas = pessoas.map( p => {
        return {label:p.nome , value: p.codigo}
      });
    })
    .catch(erro => this.errorhandler.handle(erro));
  }

  salvar(form: FormControl) {
    console.log(this.lancamento)
  }

}
