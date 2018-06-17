import { Component, OnInit } from '@angular/core';
import {Workout} from '../workout';
import {UserService, WorkoutService} from '../../service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts: Workout[];

  constructor(private userService: UserService,
              private workoutService: WorkoutService) { }

  ngOnInit() {
    this.getAll()
  }

  add() {

  }

  getAll() {
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }

}
