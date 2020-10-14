export class Lancamento {
    codigo: number;
    tipoLancamento: string = 'RECEITA';
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
    anexo: string;
    urlAnexo: string;

}

export class Pessoa {
    codigo: number;
    nome: string;
    endereco = new Endereco;
    ativo = true;
    contatos = new Array<Contato>();
}

export class Contato {
    codigo: number;
    nome: string;
    email: string;
    telefone: string;

    constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {

        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

export class Categoria {

}

export class Endereco {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
}