import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosURL: string;

  constructor(private http: HttpClient) {
    this.lancamentosURL = `${environment.apiUrl}/lancamentos`
   }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    
    //Para declarar os parâmetros
    let params = new HttpParams();

    params = params.set("inicio", moment(inicio,"DD/MM/YYYY").format("YYYY-MM-DD"));
    params = params.set("fim",moment(fim,"DD/MM/YYYY").format("YYYY-MM-DD"));

    //Para a requisição
    return this.http.get(`${this.lancamentosURL}/relatorios/por-pessoa`, { params, responseType: 'blob' })
        .toPromise()
        .then(response => response);

  }
}
