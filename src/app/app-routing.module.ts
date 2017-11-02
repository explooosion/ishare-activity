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
import { CreateComponent } from './container/mission/create/create.component';
import { IntroduceComponent } from './container/mission/introduce/introduce.component';

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

  // 任務相關操作
  { path: 'mission/create', component: CreateComponent },
  { path: 'mission/introduce', component: IntroduceComponent },

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
