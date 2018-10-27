import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {GuestGuard} from "./pages/guard/guest.guard";
import {LoginComponent} from "./login/login.component";
import {ChangePasswordComponent} from "./pages/change-password";
import {LoginGuard} from "./pages/guard/login.guard";
import {AdminComponent} from "./pages/admin";
import {AdminGuard} from "./pages/guard/admin.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";
import {SignupComponent} from './signup/signup.component';
import {UserDetailsComponent} from './pages/component/user-details/user-details.component';
import {WorkoutDetailsComponent} from './pages/component/workout-components/workout-details/workout-details.component';
import {WorkoutsComponent} from './pages/component/workout-components/workouts/workouts.component';
import {ExerciseDetailsComponent} from './pages/component/exercise-components/exercise-details/exercise-details.component';
import {ExercisesComponent} from './pages/component/exercise-components/exercises/exercises.component';
import {WorkoutMovementsStyleDashboardComponent} from './pages/component/workout-components/workout-movements-style-dashboard/workout-movements-style-dashboard.component';
import {WorkoutStyleDashboardComponent} from './pages/component/workout-components/workout-style-dashboard/workout-style-dashboard.component';
import {SignupModule} from './signup/signup.module';

// add routing to child component
// https://github.com/angular/angular-cli/issues/3243

export const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule'
    // ,
    // canActivate: [LoginGuard]
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
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard]
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AdminGuard]
  // },
  // {
  //   path: 'user-details/:id',
  //   component: UserDetailsComponent,
  //   canActivate: [AdminGuard]
  // },
  // {
  //   path: 'user-details',
  //   component: UserDetailsComponent,
  //   canActivate: [AdminGuard]
  // }
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
