import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

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
    private router: Router
  ) { }

  create(): void {
    this.service.create(this.client).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Create Client')
        } else {
          this.toast.success(response.msg, 'Create Client')
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