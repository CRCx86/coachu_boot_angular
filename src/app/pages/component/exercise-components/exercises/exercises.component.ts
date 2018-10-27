import { Component, OnInit } from '@angular/core';
import {Exercise} from '../../../../shared/models/exercise';
import {UserService} from '../../../../shared/service';
import {ExerciseService} from '../../../../shared/service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];

  submitted = false;

  constructor(private userService: UserService,
              private exerciseService: ExerciseService) { }

  ngOnInit() {

    this.getAll();

    // this.exercises = [
    //   {id: 100001, description: 'pull ups', exercisename: 'pull ups', exerciseType: ['GYMNSTICS']},
    //   {id: 100002, description: 'clean', exercisename: 'clean', exerciseType: ['WIGHTLIFTINGS']},
    //   {id: 100003, description: 'row', exercisename: 'row', exerciseType: ['MONOSTRUCTURIALS']}
    // ];

    // this.getAll();
  }

  add(exerciseName, exerciseType) {

    let exercise = new Exercise();
    exercise.exerciseName = exerciseName;
    exercise.description = exerciseName;
    exercise.exerciseType = exerciseType;

    console.log(exercise);

    this.exerciseService.addExercise(exercise)
      .delay(1000)
      .subscribe(data => {
          console.log(data);
        },
        error => {
          this.submitted = false;
          console.log('save log' + JSON.stringify(error));
        });
  }

  getAll() {
    this.exerciseService.getExercises()
      .subscribe(exercises => this.exercises = exercises);
  }
}
