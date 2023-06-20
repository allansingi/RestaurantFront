import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ResponseClient } from '../models/responseClient';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ResponseClient> {
    return this.http.get<ResponseClient>(`${API_CONFIG.baseUrl}/clientList`);
  }
  
  findById(client: Client): Observable<Client> {
    return this.http.post<Client>(`${API_CONFIG.baseUrl}/clientById`, client);
  }
  
  create(client: Client): Observable<ResponseClient> {
    return this.http.post<ResponseClient>(`${API_CONFIG.baseUrl}/addClient`, client);
  }

  update(client: Client): Observable<ResponseClient> {
    return this.http.post<ResponseClient>(`${API_CONFIG.baseUrl}/updateClient`, client);
  }

}