import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientDataService } from 'src/app/services/client-data.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  
  ELEMENT_DATA: Client[] = []

  displayedColumns: string[] = ['id', 'name', 'nif', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClientService, 
    private router: Router,
    private clientDataService: ClientDataService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response.resValues;
      this.dataSource = new MatTableDataSource<Client>(response.resValues);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateButton(client: Client) {
    this.clientDataService.setClientData(client);
    this.router.navigate(['clients/update']);
  }

  deleteButton(client: Client) {
    this.clientDataService.setDeleteClientData(client);
    this.router.navigate(['clients/delete']);
  }

}