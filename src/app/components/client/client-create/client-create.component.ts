import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  nif: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  address: FormControl = new FormControl(null, Validators.minLength(10));
  password: FormControl = new FormControl(null, Validators.minLength(3));

  validateFields(): boolean {
    return this.nome.valid && this.nif.valid && this.email.valid && this.address.valid && this.password.valid;
  }

}