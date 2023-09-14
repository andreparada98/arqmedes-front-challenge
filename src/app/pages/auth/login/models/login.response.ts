export class LoginResponse {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export type UserToken = LoginResponse;
