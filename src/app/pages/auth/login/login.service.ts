import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from './models/login.dto';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { LoginResponse } from './models/login.response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  loginHook(payload: LoginDto): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(`${environment.api_url}/login`, payload)
      .pipe(
        map((response) => {
          if (response && response.accessToken) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.accessToken)
            );
          }
          return response;
        })
      );
  }
}
