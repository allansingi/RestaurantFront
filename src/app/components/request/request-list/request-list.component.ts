import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Request } from 'src/app/models/request';
import { RequestDataService } from 'src/app/services/request-data.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  
  ELEMENT_DATA: Request[] = []
  FILTERED_DATA: Request[] = []

  displayedColumns: string[] = ['id', 'clientId', 'clientName', 'deliveryAddress', 'requestedMenuId', 'requestedMenuName', 'requestedQuantity', 'courierId',
  'courierName', 'createDate', 'updateDate', 'deliveredDate', 'requestStatus', 'actions'];
  dataSource = new MatTableDataSource<Request>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private service: RequestService,
    private router: Router,
    private requestDataService: RequestDataService
  ) { }
  
  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response.resValues;
      this.dataSource = new MatTableDataSource<Request>(response.resValues);
      this.dataSource.paginator = this.paginator;
    })
  }

  decodeStatus(status: any): string {
    if(status == '0')
      return 'ORDER_RECEIVED'
    else if(status == '1')
      return 'PREPARING'
    else if(status == '2')
      return 'READY'
    else if(status == '3')
      return 'IN_TRANSIT'
    else if(status == '4')
      return 'DELIVERED'
    else
      return 'CANCELLED'
  }

  updateButton(request: Request) {
    this.requestDataService.setRequestData(request);
    this.router.navigate(['requests/update']);
  }

  viewButton(request: Request) {
    this.requestDataService.setRequestData(request);
    this.router.navigate(['requests/view']);
  }

  filterStatus(status: any): void {
    let list: Request[] = [];
    this.ELEMENT_DATA.forEach(x => {
      if(x.requestStatus == status)
        list.push(x);
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Request>(list);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
