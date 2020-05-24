import { Component, OnInit } from '@angular/core';

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

  categorias = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2}
  ];

  pessoas = [
    {label: 'Luciano Carrafa Benfica', value: 1},
    {label: 'Debora da Costa dos Santos Carrafa Benfica', value: 2},
    {label: 'Cristiano Carrafa benfica', value: 3}



  ];

  constructor() { }

  ngOnInit() {
  }

}
