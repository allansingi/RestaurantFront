import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ResponseClient } from 'src/app/models/responseClient';
import { ClientDataService } from 'src/app/services/client-data.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    nif: '',
    email: '',
    address: '',
    password: '',
    profiles: [],
    createDate: ''
  }

  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router,
    private clientDataService: ClientDataService
  ) { }
  
  ngOnInit(): void {
    this.client = this.clientDataService.getDeleteClientData();
    this.client.profiles = [];
  }

  delete(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id: this.client.id }
    };
    
    this.service.delete(httpOptions).subscribe({
      next: (response) => {
        const responseClient = response as unknown as ResponseClient;
        if (responseClient.status.includes('NOK')) {
          this.toast.error(responseClient.msg, 'Delete Client')
        } else {
          this.toast.success(responseClient.msg, 'Delete Client')
          this.clientDataService.clearDeleteClientData();
          this.router.navigate(['clients'])
        }
      }
    })
  }

}