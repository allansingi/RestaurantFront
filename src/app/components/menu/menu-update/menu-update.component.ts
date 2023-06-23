import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Menu } from 'src/app/models/menu';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-update',
  templateUrl: './menu-update.component.html',
  styleUrls: ['./menu-update.component.css']
})

export class MenuUpdateComponent implements OnInit {
  
  menu: Menu = {
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    active: false,
    expireDate: '',
    imageUrl: ''
  }

  name: FormControl = new FormControl(null, Validators.minLength(3));
  description: FormControl = new FormControl(null, Validators.required);
  price: FormControl = new FormControl(null, Validators.required);
  quantity: FormControl = new FormControl(null, Validators.required);
  active: FormControl = new FormControl(null, Validators.required);
  expireDate: FormControl = new FormControl(null, Validators.required);
  imageUrl: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: MenuService,
    private toast: ToastrService,
    private router: Router,
    private menuDataService: MenuDataService
  ) { }
  
  ngOnInit(): void {
    this.menu = this.menuDataService.getMenuData();
  }

  update(): void {
    this.service.update(this.menu).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Update Menu')
        } else {
          this.toast.success(response.msg, 'Update Menu')
          this.menuDataService.clearMenuData();
          this.router.navigate(['menus'])
        }
      }
    })
  }
  
  formatQuantity(): void {
    // Remove any non-digit characters from the quantity value
    const rawValue = this.menu.quantity.replace(/\D/g, '');
    
    // Update the menu quantity with the formatted integer value
    this.menu.quantity = parseInt(rawValue, 10).toString();
  }

  formatPrice(): void {
    const priceValue = this.menu.price;
    if (priceValue) {
      const formattedPrice = Number(priceValue).toFixed(2);
      this.menu.price = formattedPrice;
    }
  }

  formatExpireDate(): void {
    const inputValue = this.expireDate.value;
    const formattedValue = inputValue
      .replace(/\D/g, '') // Remove non-digit characters
      .slice(0, 14) // Limit input to 14 characters
      .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6'); // Apply desired format
    this.expireDate.setValue(formattedValue);
  }

  validateFields(): boolean {
    return this.name.valid && this.description.valid && this.price.valid && this.quantity.valid && this.expireDate.valid && this.imageUrl.valid;
  }
}