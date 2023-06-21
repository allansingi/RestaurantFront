import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Courier } from 'src/app/models/courier';
import { ResponseCourier } from 'src/app/models/responseCourier';
import { CourierDataService } from 'src/app/services/courier-data.service';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-delete',
  templateUrl: './courier-delete.component.html',
  styleUrls: ['./courier-delete.component.css']
})
export class CourierDeleteComponent implements OnInit {

  courier: Courier = {
    id: '',
    name: '',
    nif: '',
    email: '',
    address: '',
    password: '',
    profiles: [],
    createDate: ''
  }

  constructor(
    private service: CourierService,
    private toast: ToastrService,
    private router: Router,
    private courierDataService: CourierDataService
  ) { }
  
  ngOnInit(): void {
    this.courier = this.courierDataService.getDeleteCourierData();
    this.courier.profiles = [];
  }

  delete(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id: this.courier.id }
    };
    
    this.service.delete(httpOptions).subscribe({
      next: (response) => {
        const responseCourier = response as unknown as ResponseCourier;
        if (responseCourier.status.includes('NOK')) {
          this.toast.error(responseCourier.msg, 'Delete Courier')
        } else {
          this.toast.success(responseCourier.msg, 'Delete Courier')
          this.courierDataService.clearDeleteCourierData();
          this.router.navigate(['couriers'])
        }
      }
    })
  }

}