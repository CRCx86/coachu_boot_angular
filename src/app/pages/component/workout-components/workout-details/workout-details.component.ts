import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutService} from '../../../../shared/service';
import {Location} from '@angular/common';
import {Workout} from '../../../../shared/models/workout';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Exercise} from '../../../../shared/models/exercise';
import {MatDialog} from '@angular/material';
import {WorkoutDialogExerciseAddComponent} from '../workout-dialog-exercise-add/workout-dialog-exercise-add.component';

const EXERCISES_DATA: Exercise[] = [
  {id: 1, exerciseName: 'deadlift', exerciseType: ['POWERLIFTING'], description: 'deadlift'},
  {id: 2, exerciseName: 'muscle-up', exerciseType: ['GYMNASTIC'], description: 'muscle-up'},
  {id: 3, exerciseName: 'row', exerciseType: ['MONOSTRUCTURIAL'], description: 'row'}
];

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  @Input() workout: Workout;

  workoutForm: FormGroup = new FormGroup({
    workoutname: new FormControl(),
    dateTimedescription: new FormControl(),
    workoutTypes: new FormControl(),
    exercises: new FormControl()
  });

  submitted = false;

  data: Exercise[] = EXERCISES_DATA;
  _exercise: Exercise;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workoutService: WorkoutService,
              private location: Location,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) {

  }

  ngOnInit() {

    this.createForm();

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkout(id)
        .subscribe(workout => {
          if (workout) {
            this.workout = workout;
          } else {
            this.gotoWorkoutList();
          }
        });
    } else {
      this.workout = new Workout();
      this.workout.exercises = [{id: 0, exerciseName: '', exerciseType: [''], description: ''}];
    }

  }

  createForm() {
    this.workoutForm = this.formBuilder.group({
      workoutname:['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])],
      dateTimedescription: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])],
      workoutTypes: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])],
      exercises: this.formBuilder.array([])
    })
  }

  goBack() {
    this.location.back();
  }

  gotoWorkoutList() {
    this.router.navigate(['/workouts']);
  }

  save() {

    this.submitted = true;

    console.log(this.workoutForm.value);

    this.workoutService.addWorkout(this.workoutForm.value)
      .delay(1000)
      .subscribe(data => {
          console.log(data);
          this.gotoWorkoutList();
        },
        error => {
          this.submitted = false;
          console.log('save log' + JSON.stringify(error));
        });
  }

  get exerciseForm() {
    return this.workoutForm.get('exercises') as FormArray;
  }

  public addExercise(): void {
    // MOCK

    const exercise = this.formBuilder.group({
      exercise: []
    });
    this.exerciseForm.push(exercise);

    if (this.workout.id) {
      let __last = this.workout.exercises[this.workout.exercises.length - 1].id + 1;
      let __exercisePush = {id: __last, exerciseName: '', exerciseType: [''], description: ''};
      this.workout.exercises.push(__exercisePush);
    }

    // WORK
    // this._exercise = new Exercise();
    // const dialogRef = this.dialog.open(WorkoutDialogExerciseAddComponent, {
    //   width: '250px',
    //   data: this._exercise
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result) {
    //     this.data.push(result);
    //     console.log('The exercise: ' + result.exercisename +  'was pushed')
    //   }
    // });
  }

  update() {

    this.submitted = true;

    console.log(this.workoutForm.value);

    this.workoutService.update(this.workoutForm.value)
      .delay(1000)
      .subscribe(data => {
          console.log(data);
          this.gotoWorkoutList();
        },
        error => {
          this.submitted = false;
          console.log('save log' + JSON.stringify(error));
        });
  }

  removeExercise(i) {
    this.workout.exercises.pop();
    this.exerciseForm.removeAt(i)
  }

  remove(id) {
    this.workoutService.deleteWorkout(id).subscribe();
  }

}
