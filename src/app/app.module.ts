import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// in order to work with forms on Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// HTTP requests
import { HttpClientModule } from '@angular/common/http';

// Angular Material Components imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

//Project Components
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { CourierCreateComponent } from './components/courier/courier-create/courier-create.component';
import { CourierListComponent } from './components/courier/courier-list/courier-list.component';
import { CourierUpdateComponent } from './components/courier/courier-update/courier-update.component';
import { CourierDeleteComponent } from './components/courier/courier-delete/courier-delete.component';
import { MenuListComponent } from './components/menu/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/menu/menu-create/menu-create.component';
import { MenuUpdateComponent } from './components/menu/menu-update/menu-update.component';
import { MenuDeleteComponent } from './components/menu/menu-delete/menu-delete.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ClientListComponent,
    ClientCreateComponent,
    ClientUpdateComponent,
    ClientDeleteComponent,
    CourierListComponent,
    CourierCreateComponent,
    CourierUpdateComponent,
    CourierDeleteComponent,
    MenuListComponent,
    MenuCreateComponent,
    MenuUpdateComponent,
    MenuDeleteComponent,
    RequestListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // HTTP Requests
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
