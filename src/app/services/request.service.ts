import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseRequest } from '../models/responseRequest';
import { API_CONFIG } from '../config/api.config';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ResponseRequest> {
    return this.http.get<ResponseRequest>(`${API_CONFIG.baseUrl}/requestList`);
  }

  create(request: Request): Observable<ResponseRequest> {
    return this.http.post<ResponseRequest>(`${API_CONFIG.baseUrl}/createRequest`, request);
  }

  update(request: Request): Observable<ResponseRequest> {
    return this.http.post<ResponseRequest>(`${API_CONFIG.baseUrl}/updateRequest`, request);
  }

}