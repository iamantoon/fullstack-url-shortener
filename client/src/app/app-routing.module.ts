import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinkListComponent } from './link-list/link-list.component';
import { MyLinksComponent } from './my-links/my-links.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'all', component: LinkListComponent},
  {path: 'my', component: MyLinksComponent, canActivate: [authGuard]},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
