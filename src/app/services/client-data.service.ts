import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {

  private selectedClient: Client;
  setClientData(client: Client): void {
    this.selectedClient = client;
  }
  getClientData(): Client {
    return this.selectedClient;
  }
  clearClientData(): void {
    this.selectedClient = null;
  }

  private selectedDeleteClient: Client;
  setDeleteClientData(client: Client): void {
    this.selectedDeleteClient = client;
  }
  getDeleteClientData(): Client {
    return this.selectedDeleteClient;
  }
  clearDeleteClientData(): void {
    this.selectedDeleteClient = null;
  }

  constructor() { }
}
