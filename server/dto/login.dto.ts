import { Request, Response } from 'express';

export interface LoginDto extends Request {
  body: {
    email: string;
    password: string;
  };
}
