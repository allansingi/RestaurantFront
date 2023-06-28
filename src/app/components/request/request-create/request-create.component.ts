import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Menu } from 'src/app/models/menu';
import { Request } from 'src/app/models/request';
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
    requestedQuantity: ''
  }

  menus: Menu[] = []

  clientId: FormControl = new FormControl(null, [Validators.required])
  requestedMenuId: FormControl = new FormControl(null, [Validators.required])
  requestedQuantity: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private menuService: MenuService,
    private requestService: RequestService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.findAllMenus();
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
    })
  }

  formatQuantity(): void {
    // Remove any non-digit characters from the quantity value
    const rawValue = this.request.requestedQuantity.replace(/\D/g, '');
    // Update the menu quantity with the formatted integer value
    this.request.requestedQuantity = parseInt(rawValue, 10).toString();
  }
  
  validateFields(): boolean {
    return this.clientId.valid && this.requestedMenuId.valid && this.requestedQuantity.valid;
  }

}