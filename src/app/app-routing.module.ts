import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GuestGuard} from './pages/guard';
import {ChangePasswordComponent} from "./pages/change-password";
import {LoginGuard} from './pages/guard';
import {AdminGuard} from './pages/guard';
import {NotFoundComponent} from './pages/not-found';
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";

// add routing to child component
// https://github.com/angular/angular-cli/issues/3243

export const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule'
    ,
    canActivate: [LoginGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
    ,
    canActivate: [LoginGuard]
  },
  {
    path:'signup',
    loadChildren: './signup/signup.module#SignupModule',
    canActivate: [GuestGuard],
    pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [GuestGuard]
  },

  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
