import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
