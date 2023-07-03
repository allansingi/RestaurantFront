import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService;
  
  constructor(private http: HttpClient) { }

  authenticate(creds: Credentials) {
    return this.http.post(`${API_CONFIG.loginUrl}`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.clear();
  }

  getEmailFromSession(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      if (decodedToken && decodedToken.sub) {
        return decodedToken.sub;
      }
    }
    return null;
  }

}