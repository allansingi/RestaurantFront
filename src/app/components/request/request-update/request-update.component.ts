import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Courier } from 'src/app/models/courier';
import { Menu } from 'src/app/models/menu';
import { Request } from 'src/app/models/request';
import { CourierService } from 'src/app/services/courier.service';
import { MenuService } from 'src/app/services/menu.service';
import { RequestDataService } from 'src/app/services/request-data.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-update',
  templateUrl: './request-update.component.html',
  styleUrls: ['./request-update.component.css']
})
export class RequestUpdateComponent implements OnInit {

  request: Request = {
    id: '',
    clientId: '',
    requestedMenuId: '',
    requestedMenuName: '',
    requestedQuantity: 0,
    requestStatus: '',
    courierId: '',
    courierName: ''
  }

  menus: Menu[] = []
  selectedMenu: Menu | undefined;

  couriers: Courier[] = []
  selectedCourier: Courier | undefined;

  constructor(
    private menuService: MenuService,
    private requestService: RequestService,
    private courierService: CourierService,
    private toast: ToastrService,
    private router: Router,
    private requestDataService: RequestDataService
    ) { }

  ngOnInit(): void {
    this.request = this.requestDataService.getRequestData();
    this.findAllMenus();
    this.findAllCouriers()
  }

  update(): void {
    this.requestService.update(this.request).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Update Request')
        } else {
          this.toast.success(response.msg, 'Update Request')
          this.requestDataService.clearRequestData();
          this.router.navigate(['requests'])
        }
      }
    })
  }

  cancelButton() {
    this.requestDataService.clearRequestData();
    this.router.navigate(['requests'])
  }

  findAllMenus(): void {
    this.menuService.findAll().subscribe(response => {
      this.menus = response.resValues;
    })
  }

  findAllCouriers(): void {
    this.courierService.findAll().subscribe(response => {
      this.couriers = response.resValues;
    })
  }

  decodeStatus(status: any): string {
    if(status == '0')
      return 'ORDER_RECEIVED'
    if(status == '1')
      return 'PREPARING'
    if(status == '2')
      return 'READY'
    if(status == '3')
      return 'IN_TRANSIT'
    if(status == '4')
      return 'DELIVERED'
    else
      return 'CANCELLED'
  }

  formatQuantity(): void {
    // Convert the quantity value to a string
    const rawValue = this.request.requestedQuantity.toString();
    // Remove any non-digit characters from the quantity value
    const sanitizedValue = rawValue.replace(/\D/g, '');
    // Update the request quantity with the formatted integer value
    this.request.requestedQuantity = parseInt(sanitizedValue, 10);
  }
  
  
}