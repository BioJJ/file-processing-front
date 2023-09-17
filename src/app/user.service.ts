import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './user/user';
import { PageUser } from './user/PageUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL: string = environment.apiURLBase + '/api/users';

  constructor(private http: HttpClient) {}

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}`, user);
  }

  update(user: User): Observable<any> {
    return this.http.put<User>(`${this.apiURL}/${user.id}`, user);
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  list(page: any, size: any): Observable<PageUser> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete(user: User): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${user.id}`);
  }
}
