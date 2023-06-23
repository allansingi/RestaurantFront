import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Menu } from 'src/app/models/menu';
import { ResponseMenu } from 'src/app/models/responseMenu';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-delete',
  templateUrl: './menu-delete.component.html',
  styleUrls: ['./menu-delete.component.css']
})

export class MenuDeleteComponent implements OnInit {

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

  constructor(
    private service: MenuService,
    private toast: ToastrService,
    private router: Router,
    private menuDataService: MenuDataService
  ) { }
  
  ngOnInit(): void {
    this.menu = this.menuDataService.getDeleteMenuData();
  }

  delete(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id: this.menu.id }
    };
    
    this.service.delete(httpOptions).subscribe({
      next: (response) => {
        const responseMenu = response as unknown as ResponseMenu;
        if (responseMenu.status.includes('NOK')) {
          this.toast.error(responseMenu.msg, 'Delete Menu')
        } else {
          this.toast.success(responseMenu.msg, 'Delete Menu')
          this.menuDataService.clearDeleteMenuData();
          this.router.navigate(['menus'])
        }
      }
    })
  }

}