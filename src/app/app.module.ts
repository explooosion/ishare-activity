import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { SweetAlert2Module } from '@toverux/ngsweetalert2';

// Component
import { AppComponent } from './app.component';
import { NavComponent } from './container/nav/nav.component';
import { HomeComponent } from './container/home/home.component';
import { FooterComponent } from './container/footer/footer.component';
import { UserComponent } from './container/user/user.component';
import { LoginComponent } from './component/modal/login/login.component';
import { SignupComponent } from './component/modal/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-lg btn-primary',
      cancelButtonClass: 'btn btn-lg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
