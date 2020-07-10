import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit() {

    this.title.setTitle('Cadastro de pessoas')
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa cadastrada com sucesso!');

      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
