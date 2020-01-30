import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2019, 12, 5),
    dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
  { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2019, 10, 10),
    dataPagamento: new Date(2019, 10, 10), valor: 80000, pessoa: 'Atacado Brasil' },
  { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2020, 1, 5),
    dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
  { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2020, 1, 20),
    dataPagamento: new Date(2020, 1, 15), valor: 800, pessoa: 'Escola Abelha Rainha' },
  { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2020, 1, 7),
    dataPagamento: new Date(2020, 1, 5), valor: 55000, pessoa: 'Sebastião Souza' },
  { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2020, 2, 10),
    dataPagamento: new Date(2020, 1, 31), valor: 1750, pessoa: 'Casa Nova Imóveis' },
  { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2019, 12, 25),
    dataPagamento: null, valor: 180, pessoa: 'Academia Top' },
    { tipo: 'DESPESA', descricao: 'Mensalidade curso de ingês', dataVencimento: new Date(2020, 1, 5),
    dataPagamento: null, valor: 560, pessoa: 'Debora' },
    { tipo: 'RECEITA', descricao: 'Salário', dataVencimento: new Date(2020, 1, 30),
    dataPagamento: new Date(2020, 1, 29), valor: 5700, pessoa: 'Debora' },
    { tipo: 'RECEITA', descricao: 'Salário', dataVencimento: new Date(2020, 1, 30),
    dataPagamento: null, valor: 5700, pessoa: 'Luciano Carrafa' },
    { tipo: 'DESPESA', descricao: 'CupLover', dataVencimento: new Date(2020, 1, 5),
    dataPagamento: new Date(2020, 1, 10), valor: 7000, pessoa: 'Débora da Costa dos Santos Carrafa Benfica' }
  ];
}
