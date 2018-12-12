import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../../shared/models/exercise';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ExerciseService} from '../../../../shared/service';
import {CheckBoxExerciseItems} from '../../../../shared/models/check-box-exercise-items';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DisplayMessage} from '../../../../shared/models/display-message';
import {Subject} from 'rxjs';
import {ExerciseType} from '../../../../shared/models/exercise-type';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  @Input() exercise: Exercise;
  exerciseTypes: ExerciseType[];

  submitted = false;

  exerciseForm: FormGroup;

  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.getExerciseTypes();

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.exerciseService.getExerciseBook(id)
        .subscribe(exercise => {
          if (exercise) {
            this.exercise = exercise;
            this.fillFormControl();
          } else {
            this.gotoExeriseList();
          }
        });
    } else {
      this.exercise = new Exercise();
      this.fillFormControl();
    }
  }

  createForm() {

    this.exerciseForm = this.formBuilder.group({
      'id': new FormControl('id'),
      'exerciseName': new FormControl(''),
      'exerciseType':  new FormControl('')
    });
  }

  fillFormControl() {

    this.exerciseForm.controls['id'].setValue(this.exercise.id);
    this.exerciseForm.controls['exerciseName'].setValue(this.exercise.exerciseName);


    // https://stackoverflow.com/questions/47333171/angular-material-mat-select-not-selecting-default
    if (this.exercise.exerciseTypes[0] != undefined) {
      this.exerciseForm.controls['exerciseType'].setValue(this.exercise.exerciseTypes[0].exercise_type_id);
    }
  }

  goBack() {
    this.location.back();
  }

  gotoExeriseList() {
    this.router.navigate(['/exercises']);
  }

  save() {
    this.submitted = true;

    console.log(this.exerciseForm.value);

    this.exerciseService.addExerciseBook(this.exerciseForm.value)
      .delay(1000)
      .subscribe(data => {
          console.log(data);
          this.gotoExeriseList();
        },
        error => {
          this.submitted = false;
          console.log('save log' + JSON.stringify(error));
        });
  }

  remove(id) {
    this.exerciseService.deleteExerciseBook(id).subscribe();
  }

  getExerciseTypes() {
    this.exerciseService.getExercisesTypes()
      .subscribe(exerciseTypes => this.exerciseTypes = exerciseTypes);
  }

  // update() {
  //   this.submitted = true;
  //
  //   console.log(this.exerciseForm.value);
  //
  //   this.exerciseService.update(this.exerciseForm.value)
  //     .delay(1000)
  //     .subscribe(data => {
  //         console.log(data);
  //         this.gotoExeriseList();
  //       },
  //       error => {
  //         this.submitted = false;
  //         console.log('save log' + JSON.stringify(error));
  //       });
  // }

}
