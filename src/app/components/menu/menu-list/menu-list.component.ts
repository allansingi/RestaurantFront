import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuDataService } from 'src/app/services/menu-data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class MenuListComponent implements OnInit {
  
  ELEMENT_DATA: Menu[] = []

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity', 'active', 'expireDate', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<Menu>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: MenuService, 
    private router: Router,
    private menuDataService: MenuDataService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response.resValues;
      this.dataSource = new MatTableDataSource<Menu>(response.resValues);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateButton(menu: Menu) {
    this.menuDataService.setMenuData(menu);
    this.router.navigate(['menus/update']);
  }

  deleteButton(menu: Menu) {
    this.menuDataService.setDeleteMenuData(menu);
    this.router.navigate(['menus/delete']);
  }

  getTextColor(expireDate: string): string {
    const currentDate = new Date();
    const expireDateTime = new Date(expireDate.replace(' ', 'T'));

    if (expireDateTime < currentDate) {
      return 'past-date';
    } else {
      return 'future-date';
    }
  }

}