import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})

export class MenuCreateComponent {

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

  name: FormControl = new FormControl(null, [Validators.minLength(3)]);
  description: FormControl = new FormControl(null, [Validators.required]);
  price: FormControl = new FormControl(null, [Validators.required]);
  quantity: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(2)]);
  expireDate: FormControl = new FormControl(null, [Validators.required]);
  imageUrl: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: MenuService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    this.service.create(this.menu).subscribe({
      next: (response) => {
        if (response.status.includes('NOK')) {
          this.toast.error(response.msg, 'Create Menu')
        } else {
          this.toast.success(response.msg, 'Create Menu')
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