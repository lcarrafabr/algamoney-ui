import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UsuarioService } from '../usuario.service';
import { Usuario, UsuarioPermissoes } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-cadastro-permissao',
  templateUrl: './usuario-cadastro-permissao.component.html',
  styleUrls: ['./usuario-cadastro-permissao.component.css']
})
export class UsuarioCadastroPermissaoComponent implements OnInit {

  exibindoFormularioPermissao = false;

  list1: any[];
  list2: any[];
  

  preparaEnvio: any[] = new Array;
  usuarioPermissao = new UsuarioPermissoes

  usuarios = [];

  usuarioCarregado= [new Usuario];

  codigoUsuario: number;

  permissoesUsuarios = [];

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.carregaListaPermisscoes();
    this.list2 = [];

    this.codigoUsuario = parseInt(this.route.snapshot.params['codigo']); 

    this.carregarUsuario(this.codigoUsuario);
    
  }

  carregaListaPermisscoes() {
    this.usuarioService.listarRoles().then(role => {
      this.list1 = role;
      this.removePermissoesDisponiveisdaLista();
    });
  }

 prepararNovoContato() {

  this.exibindoFormularioPermissao = true;
 }

 verificaItem02() {

  let codigoPermissao: number;

  for(let i = 0, l = this.list2.length; i < l; i ++) {

    codigoPermissao = this.list2[i].codigo

    this.usuarioPermissao.codigo_usuario = this.codigoUsuario;
    this.usuarioPermissao.codigo_permissao = this.list2[i].codigo
    //this.preparaEnvio.push([this.codigoUsuario, codigoPermissao]);
    this.adicionar();
  }

  console.log(this.preparaEnvio);
}


adicionar() {

    this.usuarioService.adicionarPermissaoUsuario(this.usuarioPermissao)
  .then(() => {
    this.toasty.success('Usuario cadastrado com sucesso!');

    //form.reset();
    //this.usuario = new Usuario;
  })
  .catch(erro => this.errorHandler.handle(erro));
}

carregarUsuario(codigo: number) {

  this.usuarioService.buscarPorId2(codigo)
  .then(usuario => {
    //console.log(usuario);
    this.usuarios = usuario;
    this.preparaArray(usuario.permissoes, usuario.nome, usuario.email);
  })
  .catch(erro => this.errorHandler.handle(erro));
}

preparaArray(dados: Array<any>, nome: string, email: string) {

  const permissoes = dados;
  let descricao: string;
  let nomeUsuario = nome;
  let emailUsuario = email;

  for(let i = 0, l = permissoes.length; i < l; i ++) {

    descricao = permissoes[i].descricao;

    this.permissoesUsuarios.push({descricao, nome, email});
  }
  //this.removePermissoesDisponiveisdaLista();
}

removePermissoesDisponiveisdaLista() {

  let copia: any[];

  copia = this.list1;


  let permissao = 'ROLE_CADASTRAR_CATEGORIA';

  for(let i = 0, l = this.list1.length; i < l; i ++) {

    if(this.list1[i].descricao === permissao) {
      console.log('Achei: ' + this.list1[i].descricao);
      copia.splice(i, 1);
      
    }
    
  }

  console.log(copia);
}
  

}
