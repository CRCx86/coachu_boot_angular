import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkoutsComponent} from './workouts/workouts.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {WorkoutDetailsComponent} from './workout-details/workout-details.component';
import {WorkoutMovementsStyleDashboardComponent} from './workout-movements-style-dashboard/workout-movements-style-dashboard.component';
import {WorkoutStyleDashboardComponent} from './workout-style-dashboard/workout-style-dashboard.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutComponentsRoutingModule { }
