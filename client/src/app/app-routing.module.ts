import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyLinksComponent } from './my-links/my-links.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AllLinksComponent } from './all-links/all-links.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MyStatisticsComponent } from './my-statistics/my-statistics.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'all', component: AllLinksComponent},
  {path: 'my', component: MyLinksComponent, canActivate: [authGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [authGuard]},
  {path: 'my-statistics', component: MyStatisticsComponent, canActivate: [authGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
