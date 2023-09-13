import * as jsonServer from 'json-server';
import * as fs from 'fs';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from './models/users';
import { UserRegistrationDto } from './dto/user-registration.dto';

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(
    (u: User) => u.email === email && u.password === password
  );

  if (user) {
    res.send({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInRva2VuIjoiYWNjZXNzVG9rZW4ifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.fdiDY5a6w6flT3R1Zh638aUvI4BBvDHKeH0VOts_POM',
    });
  } else {
    res.status(401).send('Incorrect email or password');
  }
});

server.post('/users', checkAuthToken, async (req: Request, res: Response) => {
  const registrationData: UserRegistrationDto = req.body;

  const validationErrors = validateUserRegistration(registrationData);

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  const users = readUsers();

  const userWithSameCPF = users.find(
    (u: User) => u.cpf === registrationData.cpf
  );
  if (userWithSameCPF) {
    res.status(400).send('CPF já registrado');
    return;
  }

  const maxId = Math.max(
    ...users.map((user: UserRegistrationDto) => user.id),
    0
  );
  registrationData.id = maxId + 1;

  users.push(registrationData);
  saveUsers(users);

  res.status(201).send(registrationData);
});

server.get('/users', checkAuthToken, (req: Request, res: Response) => {
  let page = Number(req.query['page']) || 1;
  const limit = Number(req.query['limit']) || 10;
  let offset = (page - 1) * limit;

  const { users, totalCount } = getUsers(offset, limit);
  const pageNumber = Math.ceil(offset / limit) + 1;

  res.send({
    data: users,
    meta: {
      pageNumber: pageNumber,
      itemsPerPage: limit,
      totalItems: totalCount,
    },
  });
});

server.get('/users/:id', checkAuthToken, (req: Request, res: Response) => {
  const { id } = req.params;

  const users = readUsers();
  const user: User = users.find((user: User) => user.id === Number(id));

  if (!user) {
    res.status(404).send('Usuário não encontrado');
    return;
  }

  const { password, ...rest } = user;

  res.send(rest);
});

server.delete('/users/:id', checkAuthToken, (req: Request, res: Response) => {
  const { id } = req.params;

  const users = readUsers();
  const userIndex = users.findIndex((user: User) => user.id === Number(id));

  if (userIndex === -1) {
    res.status(404).send('Usuário não encontrado');
    return;
  }

  users.splice(userIndex, 1);
  saveUsers(users);

  res.send({ message: 'Usuário excluído com sucesso' });
});

function getUsers(
  offset: number,
  limit: number
): { users: User[]; totalCount: number } {
  const allUsers = readUsers();
  const paginatedUsers = allUsers.slice(offset, offset + limit);
  return {
    users: paginatedUsers.map((user: User) => ({
      nome: user.nome,
      dataNascimento: user.dataNascimento,
      cpf: user.cpf,
      cidade: user.cidade,
    })),
    totalCount: allUsers.length,
  };
}

function saveUsers(users: UserRegistrationDto[]) {
  const dbData = {
    users: users,
  };
  fs.writeFileSync('./server/db.json', JSON.stringify(dbData), 'utf-8');
}

function checkAuthToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('Authorization header is missing');
  }

  const token = authHeader.split(' ')[1];

  if (
    token !==
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInRva2VuIjoiYWNjZXNzVG9rZW4ifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.fdiDY5a6w6flT3R1Zh638aUvI4BBvDHKeH0VOts_POM'
  ) {
    return res.status(403).send('Invalid access token');
  }

  next();
}

function validateUserRegistration(data: UserRegistrationDto): string[] {
  const errors = [];

  const birthDate = new Date(data.dataNascimento);
  if (isNaN(birthDate.getTime()) || birthDate >= new Date()) {
    errors.push('dataNascimento inválida ou no futuro');
  }

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  if (!cpfRegex.test(data.cpf)) {
    errors.push('CPF inválido');
  }

  const requiredFields: (keyof UserRegistrationDto)[] = [
    'cidade',
    'cpf',
    'dataNascimento',
    'estadoCivil',
    'nome',
    'profissao',
    'uf',
  ];
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(`${field} é obrigatório`);
    }
  }

  return errors;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json', 'utf-8');
  const users = JSON.parse(dbRaw).users;
  return users;
}

server.listen(3344, () => {
  console.log('JSON Server is running on port 3344');
});
