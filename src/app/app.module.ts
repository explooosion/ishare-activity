import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { enableProdMode } from '@angular/core';

// Plugin
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { MyDatePickerModule } from 'mydatepicker';

// Primeng [元件組-僅用到此工具的上傳]
import { AccordionModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { NgxPaginationModule } from 'ngx-pagination';

// Component
import { LoginComponent } from './component/modal/login/login.component';
import { SignupComponent } from './component/modal/signup/signup.component';

// Container
import { AppComponent } from './app.component';
import { NavComponent } from './container/nav/nav.component';
import { HomeComponent } from './container/home/home.component';
import { FooterComponent } from './container/footer/footer.component';
import { UserComponent } from './container/user/user.component';
import { ProfileComponent } from './container/user/profile/profile.component';
import { PointComponent } from './container/user/point/point.component';
import { SearchComponent } from './container/search/search.component';

import { TeacherCreateComponent } from './container/user/teacher-create/teacher-create.component';
import { TeacherManageComponent } from './container/user/teacher-manage/teacher-manage.component';
import { TeacherCheckedComponent } from './container/user/teacher-checked/teacher-checked.component';

// Container / Mission
import { CreateComponent } from './container/mission/create/create.component';
import { IntroduceComponent } from './container/mission/introduce/introduce.component';

// Container / Mission / Detail
import { VideoComponent } from './container/mission/video/video.component';
import { ShowComponent } from './container/mission/show/show.component';
import { TravelComponent } from './container/mission/travel/travel.component';
import { CleanComponent } from './container/mission/clean/clean.component';
import { SportComponent } from './container/mission/sport/sport.component';
import { ArtComponent } from './container/mission/art/art.component';


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
    CreateComponent,
    IntroduceComponent,
    VideoComponent,
    ShowComponent,
    SportComponent,
    TravelComponent,
    ArtComponent,
    CleanComponent,
    TeacherCreateComponent,
    TeacherManageComponent,
    TeacherCheckedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot({
      // buttonsStyling: false,
      // customClass: 'modal-content',
      // confirmButtonClass: 'btn btn-lg btn-primary',
      // cancelButtonClass: 'btn btn-lg'
    }),
    AccordionModule,
    FileUploadModule,
    MyDatePickerModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
