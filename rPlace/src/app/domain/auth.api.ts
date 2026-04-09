import { Injectable } from '@angular/core';
import { Api } from './api';
import { LoginDto } from './UserInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApi extends Api {
  // O retorno do endpoint é o token ou seja uma *string*
  login = (data: LoginDto) : Observable<string> => {
    return this.client.post<string>(`${this.URL}/auth/login`, data).pipe();
  }
  subscribe = (data: LoginDto): Observable<void> => {
    return this.client.post<void>(`${this.URL}/auth/subscribe`, data).pipe()
  }
}
