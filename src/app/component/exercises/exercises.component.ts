import { Component, OnInit } from '@angular/core';
import {Exercise} from '../exercise';
import {UserService} from '../../service';
import {ExerciseService} from '../../service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];

  constructor(private userService: UserService,
              private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getAll();
  }

  add() {

  }

  getAll() {
    this.exerciseService.getExercises()
      .subscribe(exercises => this.exercises = exercises);
  }
}
