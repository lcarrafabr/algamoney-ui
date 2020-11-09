import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categoria } from '../core/model';

export class categoriasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: HttpClient) { 
    this.categoriasUrl = `${environment.apiUrl}/categorias`
  }

  listarTodas(): Promise <any> {

    //const headers = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ0MDc3OTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJiZTk4NDcwNy01ODE5LTRjNDUtOTlmNy0zZTJlZWI2NGYzYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.gbRVBbPdLBLf-AY3U9zJiAs8npWDEEcBiH4Lg5MS8T4')

    //return this.http.get(this.categoriasUrl, { headers })
    return this.http.get(this.categoriasUrl)
    .toPromise()
    .then(response => {
      return response;
    });
  }

  adicionar(categoria: Categoria) {

    return this.http.post<Categoria>(this.categoriasUrl, categoria).toPromise();
  }

  buscaPorId(codigo: number): Promise<Categoria> {

    return this.http.get(`${this.categoriasUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const categoria = response as Categoria

      return categoria;
    });
  }

  excluirCategoria(codigo: number): Promise<void> {

    return this.http.delete(`${this.categoriasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  atualizarCategoria(categoria: Categoria): Promise<Categoria> {

    return this.http.put(`${this.categoriasUrl}/${categoria.codigo}`, categoria)
    .toPromise()
    .then(response => {
      const categoriaAlterada = response as Categoria

      return categoriaAlterada;
    });
  }


  

}
