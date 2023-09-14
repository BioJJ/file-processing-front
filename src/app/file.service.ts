import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { File } from './file/file';
import { PaginationFile } from './file/PaginationFile';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  apiURL: string = environment.apiURLBase + '/api/files';

  constructor(private http: HttpClient) {}

  save(file: File): Observable<File> {
    return this.http.post<File>(`${this.apiURL}`, file);
  }

  update(file: File): Observable<any> {
    return this.http.put<File>(`${this.apiURL}/${file.id}`, file);
  }

  getFile(): Observable<File[]> {
    return this.http.get<File[]>(this.apiURL);
  }

  list(page: any, size: any): Observable<PaginationFile> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  getFileById(id: number): Observable<File> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete(file: File): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${file.id}`);
  }
}
