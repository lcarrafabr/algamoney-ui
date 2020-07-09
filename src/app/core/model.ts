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

}

export class Pessoa {
    codigo: number;
    nome: string;
    endereco = new Endereco;
    ativo = true;
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