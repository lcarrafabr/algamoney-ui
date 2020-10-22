import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioPermissoes } from '../core/model';

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
  permissoesURL: string;
  usuarioPermissoesURL: string;

  constructor(
    private http: HttpClient,
  ) {
    this.usuarioURL = `${environment.apiUrl}/usuarios`
    this.permissoesURL = `${environment.apiUrl}/permissoes`
    this.usuarioPermissoesURL = `${environment.apiUrl}`
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
    });
   }

   buscarPorId2(codigo: number): Promise<any>  {

    return this.http.get(`${this.usuarioURL}/${codigo}`)
    .toPromise()
    .then(response => {
      const usuario = response as Usuario

      return usuario
    });
   }


   atualizarUsuario(usuario: Usuario): Promise<Usuario> {

    return this.http.put(`${this.usuarioURL}/${usuario.codigo}`, usuario)
    .toPromise()
    .then(response => {
      const userAlterado = response as Usuario
      return userAlterado;
    });
   }

   excluirUsuario(codigo: number): Promise<void> {

    return this.http.delete(`${this.usuarioURL}/${codigo}`)
    .toPromise()
    .then(() => null);
   }

   pesquisar(filtro: UsuarioFiltro): Promise<any> {

    let params = new HttpParams;

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome', filtro.nome)
    }

    return this.http.get(`${this.usuarioURL}`, { params })
    .toPromise()
    .then(response => {
      const usuario = response

      return response;
    })
   }

   listarRoles(): Promise<any> {

    return this.http.get(`${this.permissoesURL}/listar`)
    .toPromise()
    .then(response => {
      return response;
    });
 }

 adicionarPermissaoUsuario(usuarioPermissao: UsuarioPermissoes): Promise<Usuario> {

  return this.http.post<Usuario>(`${this.usuarioPermissoesURL}/user_permition`, usuarioPermissao)
  .toPromise();
 }

}
