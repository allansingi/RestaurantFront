import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ResponseCourier } from '../models/responseCourier';
import { Courier } from '../models/courier';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ResponseCourier> {
    return this.http.get<ResponseCourier>(`${API_CONFIG.baseUrl}/courierList`);
  }
  
  findById(courier: Courier): Observable<Courier> {
    return this.http.post<Courier>(`${API_CONFIG.baseUrl}/courierById`, courier);
  }
  
  create(courier: Courier): Observable<ResponseCourier> {
    return this.http.post<ResponseCourier>(`${API_CONFIG.baseUrl}/addCourier`, courier);
  }

  update(courier: Courier): Observable<ResponseCourier> {
    return this.http.post<ResponseCourier>(`${API_CONFIG.baseUrl}/updateCourier`, courier);
  }
  
  delete(options: any): Observable<HttpEvent<ResponseCourier>> {
    return this.http.delete<ResponseCourier>(`${API_CONFIG.baseUrl}/deleteCourierById`, options);
  }
  
}