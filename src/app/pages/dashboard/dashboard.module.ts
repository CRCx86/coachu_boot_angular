import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatSelectModule, MatSlideToggleModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ApiCardComponent} from '../component/api-card';
import {ApiCardUserStatesComponent} from '../component/api-card-user-states/api-card-user-states.component';
import {ApiCardWorkoutNewsComponent} from '../component/api-card-workout-news/api-card-workout-news.component';
import {ApiCardCurrentWorkoutComponent} from '../component/api-card-current-workout/api-card-current-workout.component';
import {ExercisesComponent} from '../component/exercise-components/exercises/exercises.component';
import {ExerciseDetailsComponent} from '../component/exercise-components/exercise-details/exercise-details.component';
import {WorkoutsComponent} from '../component/workout-components/workouts/workouts.component';
import {WorkoutDetailsComponent} from '../component/workout-components/workout-details/workout-details.component';
import {WorkoutDialogExerciseAddComponent} from '../component/workout-components/workout-dialog-exercise-add/workout-dialog-exercise-add.component';
import {WorkoutStyleDashboardComponent} from '../component/workout-components/workout-style-dashboard/workout-style-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDetailsComponent} from '../component/user-details/user-details.component';
import {AdminComponent} from '../admin';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule
  ],
  declarations: [DashboardComponent, ApiCardComponent, ApiCardUserStatesComponent, ApiCardWorkoutNewsComponent, ApiCardCurrentWorkoutComponent,
    ExercisesComponent, ExerciseDetailsComponent, WorkoutsComponent, WorkoutDetailsComponent, WorkoutDialogExerciseAddComponent, WorkoutStyleDashboardComponent, UserDetailsComponent]
})
export class DashboardModule {
}
