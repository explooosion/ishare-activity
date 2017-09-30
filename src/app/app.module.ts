import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


// Component
import { AppComponent } from './app.component';
import { NavComponent } from './container/nav/nav.component';
import { HomeComponent } from './container/home/home.component';
import { FooterComponent } from './container/footer/footer.component';
import { UserComponent } from './container/user/user.component';
import { LoginComponent } from './component/modal/login/login.component';
import { SignupComponent } from './component/modal/signup/signup.component';
import { SearchComponent } from './container/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
