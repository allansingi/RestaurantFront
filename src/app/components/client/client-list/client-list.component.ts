import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
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

  constructor(private service: ClientService) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource<Client>(response);
    })
  }

}