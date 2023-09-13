import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiURL: string = environment.apiURLBase + '/api/dashboard';

  constructor(private http: HttpClient) {}
}
