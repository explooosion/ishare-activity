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
import { SportComponent } from './container/mission/sport/sport.component';
import { BicycleComponent } from './container/mission/bicycle/bicycle.component';
import { InformationComponent } from './container/mission/information/information.component';
import { ArtComponent } from './container/mission/art/art.component';
import { CleanComponent } from './container/mission/clean/clean.component';
import { OutcleanComponent } from './container/mission/outclean/outclean.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/point', component: PointComponent },
  { path: 'search', component: SearchComponent },
  { path: 'mission/sport', component:SportComponent},
  { path: 'mission/bicycle', component:BicycleComponent},
  { path: 'mission/information', component:InformationComponent},
  { path: 'mission/art', component:ArtComponent},
  { path: 'mission/clean', component:CleanComponent},
  { path: 'mission/outclean', component:OutcleanComponent},
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
