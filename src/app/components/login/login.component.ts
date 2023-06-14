import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  creds: Credentials = {
    email: '',
    password: ''
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService) { }

  login() {
    this.toast.error('Username and/or Password invalid', 'Login');
    this.creds.password = '';
  }

  validateFields(): boolean {
    if(this.email.valid && this.password.valid)
      return true;
    else
      return false;
  }

}