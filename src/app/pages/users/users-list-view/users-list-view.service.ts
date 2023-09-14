import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'server/models/users';
import { environment } from 'src/environments/environment';
import { UserListViewResponse } from './models/users-list-view.response';

@Injectable({
  providedIn: 'root',
})
export class UsersListViewService {
  constructor(private httpClient: HttpClient) {}

  getUserById(id: number): Observable<UserListViewResponse> {
    return this.httpClient
      .get<UserListViewResponse>(`${environment.api_url}/users/${id}`)
      .pipe();
  }
}
