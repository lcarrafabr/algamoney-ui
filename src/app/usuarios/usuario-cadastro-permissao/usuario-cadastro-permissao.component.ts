import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UsuarioService } from '../usuario.service';
import { Usuario, UsuarioPermissoes } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario-cadastro-permissao',
  templateUrl: './usuario-cadastro-permissao.component.html',
  styleUrls: ['./usuario-cadastro-permissao.component.css']
})
export class UsuarioCadastroPermissaoComponent implements OnInit {

  exibindoFormularioPermissao = false;

  list1: any[];
  list2: any[];

  copiaList01: any[];
  copiaList02: any[];
  

  preparaEnvio: any[] = new Array;
  usuarioPermissao = new UsuarioPermissoes

  usuarios = [];
  nomeUsuario: string;
  

  usuarioCarregado= [new Usuario];

  codigoUsuario: number;

  permissoesUsuarios = [];
  tituloPanel: string;

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {

    this.carregaListaPermisscoes();
    this.list2 = [];

    this.codigoUsuario = parseInt(this.route.snapshot.params['codigo']); 

    if(this.codigoUsuario) {
      this.carregarUsuario(this.codigoUsuario);
    }
    
  }

  carregaListaPermisscoes() {
    this.usuarioService.listarRoles().then(role => {
      this.list1 = role;
      //this.removePermissoesDisponiveisdaLista();
      
    });
  }

 prepararNovoContato(id: number) {

  if(id === 0) {
    this.tituloPanel = 'Cadastro de permissões'
  }else {
    this.tituloPanel = 'Edição de permissões'
    
    this.copiaList01 = this.list1;
    this.copiaList02 = this.list2;

    this.preparaEdicao();
  }

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

  //console.log(this.preparaEnvio);
}


adicionar() {

    this.usuarioService.adicionarPermissaoUsuario(this.usuarioPermissao)
  .then(() => {
    this.toasty.success('Usuario cadastrado com sucesso!');

    location.reload();
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

  for(let i = 0, l = permissoes.length; i < l; i ++) {

    descricao = permissoes[i].descricao;
    this.nomeUsuario = nome;
    this.permissoesUsuarios.push({descricao, nome, email});
  }
  this.removePermissoesDisponiveisdaLista();
}

removePermissoesDisponiveisdaLista() {

  let copiaList01 = [];
  let copiaList02 = [];
  let index = this.permissoesUsuarios.length;

  //copia = this.list1;


  let permissao: string;

  for(let i = 0, l = this.list1.length; i < l; i ++) {

    if (i < index && i != index) {
      permissao = this.permissoesUsuarios[i].descricao;
    }
    
    if(this.list1[i].descricao != permissao) {

      copiaList01.push(this.list1[i]);
    
    } else {
      copiaList02.push(this.list1[i]);
    }

  }
  this.list1 = copiaList01;
  this.list2 = copiaList02;

}

bloquePermissoes() {

  this.confirmation.confirm({
    message: `Deseja remover todas as permissões do usuário ${this.nomeUsuario}?`,
    accept: () => {
      this.excluirTodasPermissoes(this.codigoUsuario);
    }
  });
}

excluirTodasPermissoes(codigoUser: number) {

  this.usuarioService.excluirUsuarioTodasAsPermissoes(codigoUser)
  .then(() => {
    this.toasty.success('Permissões retiradas com sucesso!');
    location.reload();
  })
}


preparaEdicao() {
  
  let verificaAlteracao = [];

  for(const list of this.list1) {

    this.list1 === this.copiaList01
    console.log('Igual')
  }
}

  

}
