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
    {label: 'Lazer', value: 1},
    {label: 'Alimentação', value: 2},
    {label: 'Supermercado', value: 3},
    {label: 'Farmácia', value: 4},
    {label: 'Outros', value: 5},
    {label: 'Financiamento', value: 6},
    {label: 'Cuplover', value: 7}
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
