import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Courier } from 'src/app/models/courier';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-create',
  templateUrl: './courier-create.component.html',
  styleUrls: ['./courier-create.component.css']
})
export class CourierCreateComponent {

  courier: Courier = {
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
    private service: CourierService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    this.service.create(this.courier).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Create Courier')
        } else {
          this.toast.success(response.msg, 'Create Courier')
          this.router.navigate(['couriers'])
        }
      }
    })
  }

  addProfile(profile: any): void {
    if (this.courier.profiles.includes(profile)) {
      this.courier.profiles.splice(this.courier.profiles.indexOf(profile), 1);
    } else {
      this.courier.profiles.push(profile);
    }
  }

  validateFields(): boolean {
    return this.name.valid && this.nif.valid && this.email.valid && this.address.valid && this.password.valid;
  }
}