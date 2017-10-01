import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { HomeComponent } from './container/home/home.component';
import { UserComponent } from './container/user/user.component';
import { ProfileComponent } from './container/user/profile/profile.component';
import { PointComponent } from './container/user/point/point.component';
import { SearchComponent } from './container/search/search.component';
import { SportComponent } from './container/mission/sport/sport.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/point', component: PointComponent },
  { path: 'search', component: SearchComponent },
  { path: 'mission/sport', component: SportComponent },
  { path: '**', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
