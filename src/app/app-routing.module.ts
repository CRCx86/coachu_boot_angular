import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {GuestGuard} from "./guard/guest.guard";
import {LoginComponent} from "./login/login.component";
import {ChangePasswordComponent} from "./change-password";
import {LoginGuard} from "./guard/login.guard";
import {AdminComponent} from "./admin";
import {AdminGuard} from "./guard/admin.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {SignupComponent} from './signup/signup.component';
import {UserDetailsComponent} from './component/user-details/user-details.component';
import {WorkoutDetailsComponent} from './component/workout-details/workout-details.component';
import {WorkoutsComponent} from './component/workouts/workouts.component';
import {ExerciseDetailsComponent} from './component/exercise-details/exercise-details.component';
import {ExercisesComponent} from './component/exercises/exercises.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'signup',
    component: SignupComponent,
    canActivate: [GuestGuard],
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'workout-details/:id',
    component: WorkoutDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'exercise-details/:id',
    component: ExerciseDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'exercises',
    component: ExercisesComponent,
    canActivate: [AdminGuard]
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
