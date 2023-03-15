import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  create(user: User) {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  edit(user: User) {
    return this.http.put(`${this.baseUrl}/${user?.id}`, user);
  }

  list() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
}
