import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../core/model';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL: string;

  constructor(
    private http: HttpClient,
  ) {
    this.usuarioURL = `${environment.apiUrl}/usuarios`
   }

   listarTodosusuarios(): Promise<any> {

      return this.http.get(`${this.usuarioURL}/listar-usuarios`)
      .toPromise()
      .then(response => {
        return response;
      });
   }

   adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post<Usuario>(this.usuarioURL, usuario)
    .toPromise();
   }

   buscarPorId(codigo: number): Promise<Usuario>  {

    return this.http.get(`${this.usuarioURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const usuario = response as Usuario

      return usuario
    })
   }
}
