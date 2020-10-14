import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;

  exibindoFormularioContato = false;
  contatoIndex: number;

  constructor() { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(frm: FormControl) {

    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    //this.pessoa.contatos.push(this.clonarContato(this.contato)); // <<=== Método alterado após preciar editar

    this.exibindoFormularioContato = false;

    frm.reset();
  }

  removerContato(index: number) {

    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato {

    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  prepararEdicaoCOntato(contato: Contato, index: number){

    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  editando() {
    console.log(this.contato.codigo)
    return this.contato && this.contato.codigo;
  }

}
