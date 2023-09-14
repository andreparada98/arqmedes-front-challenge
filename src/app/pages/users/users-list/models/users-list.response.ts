export class UsersListResponse {
  nome: string;
  dataNascimento: Date;
  cpf: string;
  cidade: string;
  constructor(nome: string, dataNascimento: Date, cpf: string, cidade: string) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.cidade = cidade;
  }
}
