import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ResponseClient } from '../models/responseClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ResponseClient> {
    return this.http.get<ResponseClient>(`${API_CONFIG.baseUrl}/clientList`);
  }

}