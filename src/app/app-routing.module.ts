import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { HomeComponent } from './container/home/home.component';

// Component - User
import { UserComponent } from './container/user/user.component';
import { ProfileComponent } from './container/user/profile/profile.component';
import { PointComponent } from './container/user/point/point.component';

import { SearchComponent } from './container/search/search.component';

// Component - Mission
import { BicycleComponent } from './container/mission/bicycle/bicycle.component';
import { InformationComponent } from './container/mission/information/information.component';
import { ExperienceComponent } from './container/mission/experience/experience.component';
import { OutcleanComponent } from './container/mission/outclean/outclean.component';
import { PlaytourComponent } from './container/mission/playtour/playtour.component';
import { TourplayComponent } from './container/mission/tourplay/tourplay.component';
import { JoinExhibitionComponent } from './container/mission/join-exhibition/join-exhibition.component';
import { VisitExhibitionComponent } from './container/mission/visit-exhibition/visit-exhibition.component';
import { CreateComponent } from './container/mission/create/create.component';
import { InterduceComponent } from './container/mission/interduce/interduce.component';

// Mission / 心得分類
import { VideoComponent } from './container/mission/video/video.component';
import { ShowComponent } from './container/mission/show/show.component';
import { TravelComponent } from './container/mission/travel/travel.component';
import { CleanComponent } from './container/mission/clean/clean.component';
import { SportComponent } from './container/mission/sport/sport.component';
import { ArtComponent } from './container/mission/art/art.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/point', component: PointComponent },
  { path: 'search', component: SearchComponent },

  { path: 'mission/bicycle', component: BicycleComponent },
  { path: 'mission/information', component: InformationComponent },
  { path: 'mission/experience', component: ExperienceComponent },

  // 底下這一包刪除或上個註解說明
  { path: 'mission/outclean', component: OutcleanComponent },
  { path: 'mission/playtour', component: PlaytourComponent },
  { path: 'mission/tourplay', component: TourplayComponent },
  { path: 'mission/join-exhibition', component: JoinExhibitionComponent },
  { path: 'mission/visit-exhibition', component: VisitExhibitionComponent },
  { path: 'mission/create', component: CreateComponent },
  { path: 'mission/interduce', component: InterduceComponent },

  // 心得分類
  { path: 'mission/video', component: VideoComponent },
  { path: 'mission/show', component: ShowComponent },
  { path: 'mission/travel', component: TravelComponent },
  { path: 'mission/clean', component: CleanComponent },
  { path: 'mission/Sport', component: SportComponent },
  { path: 'mission/art', component: ArtComponent },

  // 強制跳轉至首頁 /home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  // useHash = true , 防止 http://localhost/# 發生跳轉
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
