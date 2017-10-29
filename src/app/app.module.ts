import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { enableProdMode } from '@angular/core';

// Plugin
import { SweetAlert2Module } from '@toverux/ngsweetalert2';

// Container
import { AppComponent } from './app.component';
import { NavComponent } from './container/nav/nav.component';
import { HomeComponent } from './container/home/home.component';
import { FooterComponent } from './container/footer/footer.component';
import { UserComponent } from './container/user/user.component';
import { ProfileComponent } from './container/user/profile/profile.component';
import { PointComponent } from './container/user/point/point.component';
import { SearchComponent } from './container/search/search.component';

// Component;
import { LoginComponent } from './component/modal/login/login.component';
import { SignupComponent } from './component/modal/signup/signup.component';
import { SportComponent } from './container/mission/sport/sport.component';
import { BicycleComponent } from './container/mission/bicycle/bicycle.component';
import { InformationComponent } from './container/mission/information/information.component';
import { CleanComponent } from './container/mission/clean/clean.component';
import { OutcleanComponent } from './container/mission/outclean/outclean.component';
import { TourplayComponent } from './container/mission/tourplay/tourplay.component';
import { PlaytourComponent } from './container/mission/playtour/playtour.component';
import { VisitExhibitionComponent } from './container/mission/visit-exhibition/visit-exhibition.component';
import { JoinExhibitionComponent } from './container/mission/join-exhibition/join-exhibition.component';
import { CreateComponent } from './container/mission/create/create.component';
import { InterduceComponent } from './container/mission/interduce/interduce.component';
import { CheckjoinComponent } from './component/modal/checkjoin/checkjoin.component';
import { ExperienceComponent } from './container/mission/experience/experience.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PointComponent,
    SearchComponent,
    SportComponent,
    BicycleComponent,
    InformationComponent,
    CleanComponent,
    OutcleanComponent,
    TourplayComponent,
    PlaytourComponent,
    VisitExhibitionComponent,
    JoinExhibitionComponent,
    CreateComponent,
    InterduceComponent,
    CheckjoinComponent,
    ExperienceComponent
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
