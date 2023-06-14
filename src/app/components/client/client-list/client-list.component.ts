import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  
  ELEMENT_DATA: Client[] = [
    {
      id: 1,
      name: 'Allan Borges',
      nif: '123456789',
      email: 'allan@mail.com',
      address: 'Allan St. 10',
      password: '123',
      profiles: ['0'],
      creationDate: '15/12/1985'
    }
  ]

  displayedColumns: string[] = ['id', 'name', 'nif', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

