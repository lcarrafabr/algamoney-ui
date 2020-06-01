import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';


  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams();
    const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTEwMTQ2ODIsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIxYzQ1MzhmMC03ZDJjLTRiNTItODlhYS03NjA2YmRhY2UyOWYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.dDrHaDEE0tDbn8cUNft_6uSIvebyKxp8IxcqWmuwhtQ');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
    .toPromise()
    .then(response => {
      const pessoas = response[`content`];
      const resultado = {
       pessoas,
       total: response[`totalElements`]
      };
      return resultado;
    });
  }

  listarTodos(): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTEwMTI4MzYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIxMGU3NmZjMS01M2VlLTQyNzEtOWZiZi0wN2QwMTc0ODk3ZmUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.6aJbU3d7mqOrjYBN6_yYqNkQmAlVV5mqbRaSF5avTeo');

    return this.http.get(`${this.pessoasUrl}`, { headers })
    .toPromise()
    .then(response => response[`content`]);
  }
}
