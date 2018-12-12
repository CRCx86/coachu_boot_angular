import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {WorkoutDetailsComponent} from '../component/workout-components/workout-details/workout-details.component';
import {WorkoutsComponent} from '../component/workout-components/workouts/workouts.component';
import {WorkoutStyleDashboardComponent} from '../component/workout-components/workout-style-dashboard/workout-style-dashboard.component';
import {ExerciseDetailsComponent} from '../component/exercise-components/exercise-details/exercise-details.component';
import {ExercisesComponent} from '../component/exercise-components/exercises/exercises.component';
import {ApiCardWorkoutNewsComponent} from '../component/api-card-workout-news/api-card-workout-news.component';
import {UserDetailsComponent} from '../component/user-details/user-details.component';
import {LoginGuard} from '../guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'workout-add',
    component: WorkoutDetailsComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'workout-add/:type',
    component: WorkoutDetailsComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'workout-details/:id',
    component: WorkoutDetailsComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'workouts',
    component: WorkoutsComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'workout-style-dashboard',
    component: WorkoutStyleDashboardComponent
    // ,
    // canActivate: [LoginGuard]
  },
  {
    path: 'exercise-add',
    component: ExerciseDetailsComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'exercise-details/:id',
    component: ExerciseDetailsComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'exercises',
    component: ExercisesComponent
    // ,
    // canActivate: [AdminGuard]
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent
    // ,
    // canActivate: [LoginGuard]
  },
  {
    path: 'user-details',
    component: UserDetailsComponent
    // ,
    // canActivate: [LoginGuard]
  },
  {
    path: 'news',
    component: ApiCardWorkoutNewsComponent
    // ,
    // canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
