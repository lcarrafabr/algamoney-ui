import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cidade, Estado } from '../core/model';

export class CidadeFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

cidadesURL: string;
estadosURL: string;

  constructor(
    private http: HttpClient
  ) {
    this.cidadesURL = `${environment.apiUrl}/cidades`
    this.estadosURL = `${environment.apiUrl}/estados`
   }

   listarTodos(): Promise<any> {

    return this.http.get(`${this.cidadesURL}/listar`)
    .toPromise()
    .then(response => {
      return response;
    });
   }

   listarEstados(): Promise<Estado[]> {

    return this.http.get(this.estadosURL).toPromise()
    .then(response => response as Estado[]);
  }

  adicionar(cidade: Cidade): Promise<Cidade> {

    return this.http.post<Cidade>(this.cidadesURL, cidade).toPromise();
  }

  removerCidade(codigo: number): Promise<void> {

    return this.http.delete(`${this.cidadesURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  buscaCidadePorId(codigo: number): Promise<Cidade> {

    return this.http.get(`${this.cidadesURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const cidade = response as Cidade;

      return cidade;
    });
  }

  atulizarCidade(cidade: Cidade): Promise<Cidade> {
    
    return this.http.put(`${this.cidadesURL}/${cidade.codigo}`, cidade)
    .toPromise()
    .then(response => {
      const cidadeAlterada = response as Cidade;
      return cidadeAlterada;
    })
  }

}
