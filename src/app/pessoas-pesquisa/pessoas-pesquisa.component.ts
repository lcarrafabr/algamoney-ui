import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Luciano Carrafa Benfica', cidade: 'São Paulo', estado: 'SP', ativo: true },
    { nome: 'Débora da Costa dos Santos Carrafa Benfica', cidade: 'São Paulo', estado: 'SP', ativo: true },
    { nome: 'Jessica Batista', cidade: 'Pinheiros', estado: 'ES', ativo: false },
    { nome: 'Ana Rodrigues', cidade: 'São Mateus', estado: 'ES', ativo: false },
    { nome: 'Cristiano Carrafa Benfica', cidade: 'Pinheros', estado: 'ES', ativo: true },
    { nome: 'Rebecca Carrafa', cidade: 'São Paulo', estado: 'SP', ativo: true },
    { nome: 'Julia Santos', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true }
  ];

}
