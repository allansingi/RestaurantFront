import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request';
import { RequestDataService } from 'src/app/services/request-data.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit {

  request: Request = {
    id: '',
    clientId: '',
    requestedMenuId: '',
    requestedMenuName: '',
    requestedQuantity: 0,
    requestStatus: '',
    courierId: '',
    courierName: ''
  }

  decodedStatus: string = '';

  constructor(
    private requestDataService: RequestDataService
    ) { }

  ngOnInit(): void {
    this.request = this.requestDataService.getRequestData();
    this.decodedStatus = this.decodeStatus(this.request.requestStatus);
  }

  decodeStatus(status: any): string {
    if(status == '0')
      return 'ORDER_RECEIVED'
    if(status == '1')
      return 'PREPARING'
    if(status == '2')
      return 'READY'
    if(status == '3')
      return 'IN_TRANSIT'
    if(status == '4')
      return 'DELIVERED'
    else
      return 'CANCELLED'
  }
  
}