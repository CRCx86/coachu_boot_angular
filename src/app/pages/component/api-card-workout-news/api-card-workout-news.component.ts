import { Component, OnInit } from '@angular/core';
import {Workout} from '../../../shared/models/workout';
import {UserService, WorkoutService} from '../../../shared/service';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-api-card-workout-news',
  templateUrl: './api-card-workout-news.component.html',
  styleUrls: ['./api-card-workout-news.component.scss']
})
export class ApiCardWorkoutNewsComponent implements OnInit {

  workouts: Workout[];

  tabs = [];
  coahes: User[];

  constructor(private userService: UserService,
              private workoutService: WorkoutService) { }

  ngOnInit() {
    this.getAll();
    this.getCoaches();
    console.log(this.coahes);
  }

  getAll() {
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }

  getCoaches() {
    this.workoutService.getCoaches()
      .subscribe(coaches => {
        if (coaches) {
          console.log(coaches);
          for (let coach of coaches)
            this.tabs.push(coach.username)
        }
        this.coahes = coaches;
      });
  }

  initDescription() {
    for (let workout of this.workouts) {
      for (let exercise of workout.exercises) {
        workout.description += exercise.exerciseName + '\n';
      }
    }
  }

}
