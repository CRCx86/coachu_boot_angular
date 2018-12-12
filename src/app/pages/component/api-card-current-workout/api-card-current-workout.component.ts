import { Component, OnInit } from '@angular/core';
import {Workout} from '../../../shared/models/workout';
import {Exercise} from '../../../shared/models/exercise';
import {WorkoutService} from '../../../shared/service';

// const EXERCISES_DATA: Exercise[] = [
//   {id: 1, exerciseName: 'deadlift', exerciseType: ['POWERLIFTING'], description: 'deadlift'},
//   {id: 2, exerciseName: 'muscle-up', exerciseType: ['GYMNASTIC'], description: 'muscle-up'},
//   {id: 3, exerciseName: 'row', exerciseType: ['MONOSTRUCTURIAL'], description: 'row'}
// ];

@Component({
  selector: 'app-api-card-current-workout',
  templateUrl: './api-card-current-workout.component.html',
  styleUrls: ['./api-card-current-workout.component.scss']
})
export class ApiCardCurrentWorkoutComponent implements OnInit {

  workouts: Workout[];

  constructor(private workoutService: WorkoutService) {

  }

  ngOnInit() {
    this.getAll();
  }

  initDescription() {
    for (let workout of this.workouts) {
      for (let exercise of workout.exercises) {
        workout.description += exercise.exerciseName + '\n';
      }
    }
  }

  onLogClick() {

  }

  onEditClick() {

  }

  getAll() {
    this.workoutService.getCurrentWorkout()
      .subscribe(workouts => this.workouts = workouts);
    // this.initDescription();
  }
}
