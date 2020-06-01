import { LazyLoadEvent } from 'primeng/api/public_api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    //this.pesquisar();
   //this.listarTudo();
   //this.teste();
  }

 pesquisar(pagina = 0) {

  this.filtro.pagina = pagina;

  this.pessoaService.pesquisar(this.filtro)
  .then(resultado => {
    this.totalRegistros = resultado.total;
    this.pessoas = resultado.pessoas;
  });
 }

 listarTudo() {
   this.pessoaService.listarTodos()
   .then(result => this.pessoas = result);
 }

 aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pesquisar(pagina);
}

 //teste() {
   //console.log(this.pessoaService.listarTodos()
   //.then(result => this.pessoas = result));
 //}

}
