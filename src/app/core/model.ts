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
}

export class Categoria {

}