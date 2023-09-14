import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersListDeleteService {
  constructor(private httpClient: HttpClient) {}

  deleteUserById(id: number): Observable<{ success: boolean }> {
    return this.httpClient
      .delete<{ success: boolean }>(`${environment.api_url}/users/${id}`)
      .pipe();
  }
}
