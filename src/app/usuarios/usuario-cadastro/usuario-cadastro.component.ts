import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuario } from 'src/app/core/model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario;
  validaFormulario = false;
  resenha: string;
  codigoUsuario: number;

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.codigoUsuario = this.route.snapshot.params['codigo']

    if (this.codigoUsuario) {
      this.carregarUsuario(this.codigoUsuario);
    }
  }


  adicionar(form: NgForm) {

    this.validaSenhas(this.usuario.senha, this.resenha);

    if(this.validaFormulario){

      this.usuarioService.adicionar(this.usuario)
    .then(() => {
      this.toasty.success('Usuario cadastrado com sucesso!');

      form.reset();
      this.usuario = new Usuario;
    })
    .catch(erro => this.errorHandler.handle(erro));

    }

    
  }

  validaSenhas(senha: string, repetirSenha: string) {

    if(senha != repetirSenha) {
      this.toasty.warning('As senhas digitadas não são iguais');
      this.validaFormulario = false;
      this.resenha = repetirSenha;
    }else {
      this.validaFormulario = true;
      this.resenha = repetirSenha
    }
  }

  carregarUsuario(codigo: number) {

    this.usuarioService.buscarPorId(codigo)
    .then(usuario => {
      this.usuario = usuario;

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: NgForm) {

    this.usuarioService.atualizarUsuario(this.usuario)
    .then(usuario => {
      this.usuario = usuario;

      this.toasty.success('Usuario atualizado com sucesso!');
    
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  

}
