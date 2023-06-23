import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  private selectedMenu: Menu;
  setMenuData(menu: Menu): void {
    this.selectedMenu = menu;
  }
  getMenuData(): Menu {
    return this.selectedMenu;
  }
  clearMenuData(): void {
    this.selectedMenu = null;
  }

  private selectedDeleteMenu: Menu;
  setDeleteMenuData(menu: Menu): void {
    this.selectedDeleteMenu = menu;
  }
  getDeleteMenuData(): Menu {
    return this.selectedDeleteMenu;
  }
  clearDeleteMenuData(): void {
    this.selectedDeleteMenu = null;
  }

  constructor() { }
}
