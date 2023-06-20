import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientDataService } from 'src/app/services/client-data.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {
  
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

  name: FormControl = new FormControl(null, Validators.minLength(3));
  nif: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  address: FormControl = new FormControl(null, Validators.minLength(10));
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router,
    private clientDataService: ClientDataService
  ) { }
  
  ngOnInit(): void {
    this.client = this.clientDataService.getClientData();
    this.client.profiles = [];
  }

  update(): void {
    this.service.update(this.client).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Update Client')
        } else {
          this.toast.success(response.msg, 'Update Client')
          this.clientDataService.clearClientData();
          this.router.navigate(['clients'])
        }
      }
    })
  }

  addProfile(profile: any): void {
    if (this.client.profiles.includes(profile)) {
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    } else {
      this.client.profiles.push(profile);
    }
  }

  validateFields(): boolean {
    return this.name.valid && this.nif.valid && this.email.valid && this.address.valid && this.password.valid;
  }
}