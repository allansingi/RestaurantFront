import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { Menu } from 'src/app/models/menu';
import { Request } from 'src/app/models/request';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { MenuService } from 'src/app/services/menu.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = {
    clientId: '',
    requestedMenuId: '',
    requestedQuantity: 0
  }

  menus: Menu[] = []
  selectedMenu: Menu | undefined;

  clientId: FormControl = new FormControl(null, [Validators.required])
  requestedMenuId: FormControl = new FormControl(null, [Validators.required])
  requestedQuantity: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private menuService: MenuService,
    private requestService: RequestService,
    private clientService: ClientService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.findAllMenus();
    this.getClientIdFromSession();
  }

  create(): void {
    this.requestService.create(this.request).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Create Request')
        } else {
          this.toast.success(response.msg, 'Create Request')
          this.router.navigate(['requests'])
        }
      }
    })
  }

  findAllMenus(): void {
    this.menuService.findAll().subscribe(response => {
      this.menus = response.resValues;
      this.selectedMenu = this.menus.find(menu => menu.id === this.request.requestedMenuId);
    })
  }

  getClientIdFromSession(): void {
    const email = this.authService.getEmailFromSession();
    if (email) {
      const client: Client = {
        email,
        name: '',
        nif: '',
        address: '',
        password: '',
        profiles: [],
        createDate: undefined
      }; // Create a Client object with the email
      this.clientService.findByEmail(client).subscribe(response => {
        this.request.clientId = response.resValues[0].id;
      });
    }
  }

  formatQuantity(): void {
    // Convert the quantity value to a string
    const rawValue = this.request.requestedQuantity.toString();
    // Remove any non-digit characters from the quantity value
    const sanitizedValue = rawValue.replace(/\D/g, '');
    // Update the request quantity with the formatted integer value
    this.request.requestedQuantity = parseInt(sanitizedValue, 10);
  }
  
  
  validateFields(): boolean {
    return this.clientId.valid && this.requestedMenuId.valid && this.requestedQuantity.valid;
  }

}