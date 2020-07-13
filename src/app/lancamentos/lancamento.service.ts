import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {

  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';


  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();
   // const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    //return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
    .toPromise()
    .then(response => {
      const lancamentos = response[`content`];
      const resultado = {
       lancamentos,
       total: response[`totalElements`]
      };
      return resultado;
    });

  }


  excluir(codigo: number): Promise<void> {

    let params = new HttpParams();
    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    //return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

    adicionar(lancamento: Lancamento): Promise<Lancamento> {

    //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4')
    //.set('Content-Type', 'application/json');

    //return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
  .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4')
    //.set('Content-Type', 'application/json');

    //return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
    .toPromise()
    .then(response => {
     /* const lancamentosAlterado = response[`content`];*/
     const lancamentosAlterado = response as Lancamento;

      this.converterStringParaDatas([lancamento]);

      return lancamentosAlterado;
    });
  }

  buscaPorCodigo(codigo: number): Promise<Lancamento> {

    let params = new HttpParams();
    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    //return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamentos = response as Lancamento;

      this.converterStringParaDatas([lancamentos]);

      return lancamentos;
    });
  }

  private converterStringParaDatas(lancamentos: Lancamento []) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }


}
