import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {WorkoutDetailsComponent} from '../component/workout-components/workout-details/workout-details.component';
import {WorkoutsComponent} from '../component/workout-components/workouts/workouts.component';
import {WorkoutMovementsStyleDashboardComponent} from '../component/workout-components/workout-movements-style-dashboard/workout-movements-style-dashboard.component';
import {WorkoutStyleDashboardComponent} from '../component/workout-components/workout-style-dashboard/workout-style-dashboard.component';
import {ExerciseDetailsComponent} from '../component/exercise-components/exercise-details/exercise-details.component';
import {ExercisesComponent} from '../component/exercise-components/exercises/exercises.component';

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
    path: 'workout-movements-style-dashboard',
    component: WorkoutMovementsStyleDashboardComponent
    // ,
    // canActivate: [LoginGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
