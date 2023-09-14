export class UsersListResponse {
  id: number;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  cidade: string;
  constructor(
    id: number,
    nome: string,
    dataNascimento: Date,
    cpf: string,
    cidade: string
  ) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.cidade = cidade;
    this.id = id;
  }
}
