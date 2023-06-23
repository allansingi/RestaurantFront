import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  
  ELEMENT_DATA: Request[] = [
    {
      id: 1,
            clientId: '1',
            clientName: 'Allan Borges',
            deliveryAddress: 'minha casa',
            requestedMenuId: '3',
            requestedMenuName: 'BBQ',
            requestedQuantity: '1',
            courierId: 6,
            courierName: 'NOT_ASSIGNED',
            createDate: '2023-06-23 13:10:33',
            updateDate: '2023-06-23 13:10:33',
            deliveredDate: '2023-06-23 13:10:33',
            requestStatus: '0'
    }
  ]

  displayedColumns: string[] = ['id', 'clientId', 'clientName', 'deliveryAddress', 'requestedMenuId', 'requestedMenuName', 'requestedQuantity', 'courierId',
  'courierName', 'createDate', 'updateDate', 'deliveredDate', 'requestStatus', 'actions'];
  dataSource = new MatTableDataSource<Request>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
