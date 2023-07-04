import { Injectable } from '@angular/core';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  private selectedRequest: Request;
  setRequestData(request: Request): void {
    this.selectedRequest = request;
  }
  getRequestData(): Request {
    return this.selectedRequest;
  }
  clearRequestData(): void {
    this.selectedRequest = null;
  }

  constructor() { }
}
