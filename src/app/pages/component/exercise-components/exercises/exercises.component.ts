import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../../../shared/models/exercise';
import {UserService} from '../../../../shared/service';
import {ExerciseService} from '../../../../shared/service';
import {DisplayMessage} from '../../../../shared/models/display-message';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ExerciseType} from '../../../../shared/models/exercise-type';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];
  exerciseTypes: ExerciseType[];
  selectedTypeValue: ExerciseType;

  submitted = false;

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.getAll();
    this.getExerciseTypes();
  }

  add(exerciseName, exerciseType) {

    let exercise = new Exercise();
    exercise.exerciseName = exerciseName;
    exercise.description = exerciseName;
    exercise.exerciseTypes = exerciseType;

    console.log(exercise);

    this.exerciseService.addExerciseBook(exercise)
      .delay(1000)
      .subscribe(data => {
          console.log(data);
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: JSON.stringify(error)};
          // console.log('save log' + JSON.stringify(error));
        });
  }

  getAll() {
    this.exerciseService.getExercisesBook()
      .subscribe(exercises => this.exercises = exercises);
  }

  getExerciseTypes() {
    this.exerciseService.getExercisesTypes()
      .subscribe(exerciseTypes => this.exerciseTypes = exerciseTypes);
  }

}
