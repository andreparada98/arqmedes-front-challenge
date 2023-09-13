interface BaseEntity {
  id: number;
}

export interface User extends BaseEntity {
  email?: string;
  password?: string;
  role?: string;
  cpf: string;
  profissao: string;
  dataNascimento: string;
  estadoCivil: string;
  uf: string;
  cidade: string;
  nome: string;
}
