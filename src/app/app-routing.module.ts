import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { CourierListComponent } from './components/courier/courier-list/courier-list.component';
import { CourierCreateComponent } from './components/courier/courier-create/courier-create.component';
import { CourierUpdateComponent } from './components/courier/courier-update/courier-update.component';
import { CourierDeleteComponent } from './components/courier/courier-delete/courier-delete.component';
import { MenuListComponent } from './components/menu/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/menu/menu-create/menu-create.component';
import { MenuUpdateComponent } from './components/menu/menu-update/menu-update.component';
import { MenuDeleteComponent } from './components/menu/menu-delete/menu-delete.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestCreateComponent } from './components/request/request-create/request-create.component';
import { RequestUpdateComponent } from './components/request/request-update/request-update.component';
import { RequestViewComponent } from './components/request/request-view/request-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},

      {path: 'clients', component: ClientListComponent},
      {path: 'clients/create', component: ClientCreateComponent},
      {path: 'clients/update', component: ClientUpdateComponent},
      {path: 'clients/delete', component: ClientDeleteComponent},

      {path: 'couriers', component: CourierListComponent},
      {path: 'couriers/create', component: CourierCreateComponent},
      {path: 'couriers/update', component: CourierUpdateComponent},
      {path: 'couriers/delete', component: CourierDeleteComponent},

      {path: 'menus', component: MenuListComponent},
      {path: 'menus/create', component: MenuCreateComponent},
      {path: 'menus/update', component: MenuUpdateComponent},
      {path: 'menus/delete', component: MenuDeleteComponent},

      {path: 'requests', component: RequestListComponent},
      {path: 'requests/create', component: RequestCreateComponent},
      {path: 'requests/update', component: RequestUpdateComponent},
      {path: 'requests/view', component: RequestViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
