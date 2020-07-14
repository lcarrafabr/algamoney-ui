import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {

    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

        let errors;

        msg = 'Ocorreu um erro ao processar sua solicitação';

        if(errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar essa ação';
        }

        try {

          errors = errorResponse;
          //errors = errorResponse['content'];

          msg = errors[0].mensagemUsuario;
        } catch (e) {}

        console.error('Ocorreu um erro', errorResponse);

    } else {

      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro.', errorResponse);
    }

    this.toasty.error(msg);

  }

}
