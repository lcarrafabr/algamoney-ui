import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment'


export class DashBoardFiltro {

  dataMesRef: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
   }

   lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatistica/por-categoria`)
        .toPromise()
        .then(response => response as Array<any>);
}

lancamentosPorDia(): Promise<Array<any>> {
  return this.http.get(`${this.lancamentosUrl}/estatistica/por-dia`)
      .toPromise()
      //.then(response => response as Array<any>);
      .then(response => {
        const dados = response as Array<any>
        this.converterStringsParaDatas(dados);

        return dados;
      });
}

lancamentosFiltroPorDia(filtro: DashBoardFiltro): Promise<Array<any>> {

  let params = new HttpParams();

  params = params.set('dataMesRef', moment(filtro.dataMesRef).format('YYYY-MM-DD'))

  console.log("params: " + params)

  return this.http.get(`${this.lancamentosUrl}/estatistica/filtro-por-dia`, { params })
      .toPromise()
      //.then(response => response as Array<any>);
      .then(response => {
        const dados = response as Array<any>
        this.converterStringsParaDatas(dados);

        return dados;
      });
}

private converterStringsParaDatas(dados: Array<any>) {

  for (const dado of dados) {
    dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
  }
}

}
