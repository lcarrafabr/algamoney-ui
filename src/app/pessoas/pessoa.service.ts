import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';
import { promise } from 'protractor';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;


  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams();
    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    //return this.http.get(`${this.pessoasUrl}`, { headers, params })
    return this.http.get(`${this.pessoasUrl}`, { params })
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
//****************************************************************************************************************************************************************** *//
  pesquisarTodos(): Promise<any> {

    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    //return this.http.get(`${this.pessoasUrl}`, { headers })
    return this.http.get(`${this.pessoasUrl}/listar`)
    .toPromise()
    .then(response => response);
  }
//****************************************************************************************************************************************************************** *//
  listarTodos(): Promise<any> {

    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    //return this.http.get(`${this.pessoasUrl}`, { headers })
    return this.http.get(`${this.pessoasUrl}`)
    .toPromise()
    .then(response => response[`content`]);
  }
//****************************************************************************************************************************************************************** *//

  excluir(codigo: number): Promise<void> {

    let params = new HttpParams();
    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');

    //return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

    mudarStatus(codigo: number, ativo: boolean): Promise<void> {
      
      const headers = new HttpHeaders()
      //.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4')
      .set('Content-Type', 'application/json');

      //return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);

    }

    adicionar(pessoa: Pessoa): Promise<Pessoa> {

      //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4')
      //.set('Content-Type', 'application/json');

    //return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
    .toPromise();
    }

    buscarPorCodigo(codigo: number): Promise<Pessoa> {
      let params = new HttpParams();
      //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4');
      
      //return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {

        const pessoas = response as Pessoa;

        return pessoas
      })
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {

    //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4')
    //.set('Content-Type', 'application/json');

    //return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa , { headers })
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    .toPromise()
    .then(response => {
      const pessoaAlterada = response as Pessoa;

      return pessoaAlterada;
    })

    }



}
