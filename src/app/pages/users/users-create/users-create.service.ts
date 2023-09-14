import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'server/models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersCreateService {
  constructor(private httpClient: HttpClient) {}

  createUser(payload: User): Observable<User> {
    return this.httpClient
      .post<User>(`${environment.api_url}/users`, payload)
      .pipe();
  }

  getCitiesByUf(uf: string): Observable<any> {
    return this.httpClient
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios
    `
      )
      .pipe();
  }

  updateUser(payload: User, id: number): Observable<User> {
    return this.httpClient
      .put<User>(`${environment.api_url}/users/${id}`, payload)
      .pipe();
  }
}
