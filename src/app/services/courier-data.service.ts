import { Injectable } from '@angular/core';
import { Courier } from '../models/courier';

@Injectable({
  providedIn: 'root'
})
export class CourierDataService {

  private selectedCourier: Courier;
  setCourierData(courier: Courier): void {
    this.selectedCourier = courier;
  }
  getCourierData(): Courier {
    return this.selectedCourier;
  }
  clearCourierData(): void {
    this.selectedCourier = null;
  }

  private selectedDeleteCourier: Courier;
  setDeleteCourierData(courier: Courier): void {
    this.selectedDeleteCourier = courier;
  }
  getDeleteCourierData(): Courier {
    return this.selectedDeleteCourier;
  }
  clearDeleteCourierData(): void {
    this.selectedDeleteCourier = null;
  }

  constructor() { }
}
