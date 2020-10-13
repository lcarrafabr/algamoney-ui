import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  options = {
    showAllTooltips: true,
    tooltips: {
      callbacks: {
        label:(tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2')
        }
      }
    },

    title: {
      display: false,
      text: 'My Title',
      fontSize: 16
  },
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
    .then(dados => {

      this.pieChartData = {
        labels: dados.map(dado => dado.categotia.nome),
        datasets: [
          {
            data: dados.map(dado => dado.total),
            backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912'],
            hoverBorderColor: "rgba(255,99,132,1)"
          }
        ]
      };

    });
  }

  configurarGraficoLinha() {

    this.dashboardService.lancamentosPorDia()
    .then(dados => {

      const diasDoMes = this.configurarDiasMes();
      const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
      const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC',
            hoverBorderColor: "#3366CC"
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00',
            hoverBorderColor: "#D62B00"
          }
        ]
      };

    });
  }

  private configurarDiasMes() {

    const mesReferencia = new Date();

    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number [] = [];

    for(let i = 1; i <= quantidade; i ++){
      dias.push(i);
    }

    return dias;
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    
    const totais: number [] = [];

    for (const dia of diasDoMes) {

      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);
    }
    return totais;
  }

}
