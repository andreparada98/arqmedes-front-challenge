import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseListResponse } from 'src/shared/model/base-list.model';
import { UsersListResponse } from './models/users-list.response';
import { UsersListRequestDto } from './models/users-list.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  constructor(private httpClient: HttpClient) {}

  getUsers(
    payload: UsersListRequestDto
  ): Observable<BaseListResponse<UsersListResponse>> {
    let params = new HttpParams();

    const { nome, page, pageSize } = payload;

    if (page) {
      params = params.append('page', page);
    }

    if (pageSize) {
      params = params.append('pageSize', pageSize);
    }

    if (nome) {
      params = params.append('nome', nome);
    }

    return this.httpClient
      .get<BaseListResponse<UsersListResponse>>(
        `${environment.api_url}/users`,
        {
          params,
        }
      )
      .pipe();
  }
}
