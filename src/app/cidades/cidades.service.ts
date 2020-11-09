import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http: HttpClient
  ) {
    this.cidadesURL = `${environment.apiUrl}`
   }

   listarTodos(): Promise<any> {

    return this.http.get(`${this.cidadesURL}/cidades/listar`)
    .toPromise()
    .then(response => {
      return response;
    });
   }


}
