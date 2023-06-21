import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Courier } from 'src/app/models/courier';
import { CourierDataService } from 'src/app/services/courier-data.service';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-list',
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.css']
})
export class CourierListComponent implements OnInit {
  
  ELEMENT_DATA: Courier[] = []

  displayedColumns: string[] = ['id', 'name', 'nif', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<Courier>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: CourierService, 
    private router: Router,
    private courierDataService: CourierDataService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response.resValues;
      this.dataSource = new MatTableDataSource<Courier>(response.resValues);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateButton(courier: Courier) {
    this.courierDataService.setCourierData(courier);
    this.router.navigate(['couriers/update']);
  }

  deleteButton(courier: Courier) {
    this.courierDataService.setDeleteCourierData(courier);
    this.router.navigate(['couriers/delete']);
  }

}