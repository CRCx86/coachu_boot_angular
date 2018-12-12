import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExerciseService, UserService, WorkoutService} from '../../../../shared/service';
import {Location, Time} from '@angular/common';
import {Workout} from '../../../../shared/models/workout';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Exercise} from '../../../../shared/models/exercise';
import {MatDialog} from '@angular/material';
import {WorkoutTypes} from '../../../../shared/models/workout-types';
import {Observable, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user';
import {DisplayMessage} from '../../../../shared/models/display-message';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  @Input() workout: Workout;
  @Input() workoutType: WorkoutTypes[];

  user: User;

  workoutForm: FormGroup;
  submitted = false;

  exercises$: Observable<Exercise[]>;
  private searchTerms = new Subject<string>();

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workoutService: WorkoutService,
              private exerciseService: ExerciseService,
              private userService: UserService,
              private location: Location,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit(){

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkout(id)
        .subscribe(workout => {
          if (workout) {
            this.workout = workout;
            this.createForm();
          } else {
            this.gotoWorkoutList();
          }
        });
    } else {
      const type = this.route.snapshot.paramMap.get('type');
      if (type) {
        this.workoutType = [];
        switch (type) {
          case 'AMRAP': {
            this.workoutType.push(type);
            break;
          }
          case 'RFT': {
            this.workoutType.push(type);
            break;
          }
          case 'EMOM': {
            this.workoutType.push(type);
            break;
          }
          case 'AltEMOM': {
            this.workoutType.push(type);
            break;
          }
          case 'AFAP': {
            this.workoutType.push(type);
            break;
          }
          case 'SETS': {
            this.workoutType.push(type);
            break;
          }
          case 'TABATA': {
            this.workoutType.push(type);
            break;
          }
          case 'ERFT': {
            this.workoutType.push(type);
            break;
          }
          case 'NFT': {
            this.workoutType.push(type);
            break;
          }
          case 'HAVIEST': {
            this.workoutType.push(type);
            break;
          }
          default: {
            this.workoutType.push(type);
          }
        }
        this.createForm();
      }
      this.workout = new Workout();
    }

    this.exercises$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.exerciseService.searchExerciseBook(term)),
    );

    this.user = this.userService.currentUser;
  }

  createForm() {

    this.workoutForm = this.formBuilder.group({
      'id': new FormControl(''),
      'workoutName': new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])),
      'dateTime': new FormControl(new Date(), Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])),
      'workoutTypes': new FormControl(this.workoutType, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])),
      'searchExercise': new FormControl(''),
      'sets': new FormControl('1'),
      'exercises': this.formBuilder.array([]),
      'totalReps': new FormControl(''),
      'totalTime': new FormControl(),
      'workoutStyle': new FormControl(''),
      'instructions': new FormControl(''),
      'timeLimit': new FormControl(),
      'user': new FormControl()
    });

    if (this.workout != undefined) {

      this.workoutForm.controls['id'].setValue(this.workout.id);
      this.workoutForm.controls['workoutName'].setValue(this.workout.workoutName);
      this.workoutForm.controls['dateTime'].setValue(this.workout.dateTime);
      this.workoutForm.controls['workoutTypes'].setValue(this.workout.workoutTypes);
      this.workoutForm.controls['sets'].setValue(this.workout.sets);
      this.workoutForm.controls['workoutStyle'].setValue(this.workout.workoutStyle);
      this.workoutForm.controls['instructions'].setValue(this.workout.instructions);

      var timeLimit = new Date(null);
      timeLimit.setSeconds(this.workout.timeLimit);
      this.workoutForm.controls['timeLimit'].setValue(timeLimit.toISOString().substr(11, 8));

      this.workoutForm.controls['user'].setValue(this.user);

      var totalTime = new Date(null);
      totalTime.setSeconds(this.workout.totalTime);
      this.workoutForm.controls['totalTime'].setValue(totalTime.toISOString().substr(11, 8));

      this.workoutForm.controls['totalReps'].setValue(this.workout.repetitions);

      this.fillExercisesArray();

    } else {
      this.workoutForm.controls['workoutTypes'].setValue(this.workoutType);
      console.log('тренировка не заполнена');

    }
  }

  get getExerciseFormControl() {
    return this.workoutForm.controls['exercises'];
  }

  get getExercise() {
    return this.getExerciseFormControl as FormArray;
  }

  get getSearchExerciseFormControl() {
    return this.workoutForm.controls['searchExercise'];
  }

  get workoutName() {
    return this.workoutForm.get('workoutName').value;
}

  addExercise(_exercise, repetitions?, weights?) {

    this.getExercise.push(new FormGroup({
      'exerciseName': new FormControl(_exercise),
      'repetitions': new FormControl(repetitions),
      'weights': new FormControl(weights)
    }));
    this.getSearchExerciseFormControl.reset();

  }

  fillExercisesArray() {

    var exercises = this.workout.exercises;
    for(var item of exercises) {
      this.getExercise.push(new FormGroup({
        'id': new FormControl(item.id),
        'exerciseName': new FormControl(item.exerciseName),
        'repetitions': new FormControl(item.repetitions),
        'weights': new FormControl(item.weights)
      }));
    }

  }

  onChangeWorkoutStyle(item) {
    this.workoutForm.controls['workoutStyle'].setValue(item);
  }

  save() {

    this.submitted = true;

    this.workoutService.addWorkout(this.workoutForm.value)
      .delay(1000)
      .subscribe(data => {
          this.gotoWorkoutList();
        },
        error => {
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: JSON.stringify(error)};
        });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  removeExercise(i) {
    this.getExercise.removeAt(i);
  }

  remove(id) {
    this.workoutService.deleteWorkout(id).subscribe();
  }

  initDescription() {
    for (let exercise of this.workout.exercises) {
      this.workout.description += exercise.exerciseName + '\n';
    }

  }

  goBack() {
    this.location.back();
  }

  gotoWorkoutList() {
    this.router.navigate(['/workouts']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // update() {
  //
  //   this.submitted = true;
  //
  //   console.log(this.workoutForm.value);
  //
  //   this.workoutService.update(this.workoutForm.value)
  //     .delay(1000)
  //     .subscribe(data => {
  //         this.gotoWorkoutList();
  //       },
  //       error => {
  //         this.submitted = false;
  //         this.notification = {msgType: 'error', msgBody: JSON.stringify(error)};
  //         // console.log('save log' + JSON.stringify(error));
  //       });
  // }

}
