import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { ResponseMenu } from '../models/responseMenu';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ResponseMenu> {
    return this.http.get<ResponseMenu>(`${API_CONFIG.baseUrl}/menuList`);
  }

  findActive(): Observable<ResponseMenu> {
    return this.http.get<ResponseMenu>(`${API_CONFIG.baseUrl}/activeMenuList`);
  }
  
  findById(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${API_CONFIG.baseUrl}/menuById`, menu);
  }
  
  create(menu: Menu): Observable<ResponseMenu> {
    return this.http.post<ResponseMenu>(`${API_CONFIG.baseUrl}/addMenu`, menu);
  }

  update(menu: Menu): Observable<ResponseMenu> {
    return this.http.post<ResponseMenu>(`${API_CONFIG.baseUrl}/updateMenu`, menu);
  }
  
  delete(options: any): Observable<HttpEvent<ResponseMenu>> {
    return this.http.delete<ResponseMenu>(`${API_CONFIG.baseUrl}/deleteMenuById`, options);
  }
  
}