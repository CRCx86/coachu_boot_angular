import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../../shared/models/exercise';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ExerciseService} from '../../../../shared/service';
import {CheckBoxExerciseItems} from '../../../../shared/models/check-box-exercise-items';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  @Input() exercise: Exercise;

  submitted = false;

  exerciseForm: FormGroup = new FormGroup({
    exerciseName: new FormControl(),
    exerciseType: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    //MOCK

    // this.exercise = {id: 100001, description: 'pull ups', exercisename: 'pull ups', exerciseType: ['GYMNSTICS']};

    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.exerciseService.getExercise(id)
        .subscribe(exercise => {
          if (exercise) {
            this.exercise = exercise;
          } else {
            this.gotoExeriseList();
          }
        });
    } else {
      this.exercise = {id: 0, description: '', exerciseName: '', exerciseType: ['']};
    }
  }

  createForm() {
    this.exerciseForm = this.formBuilder.group({
      exerciseName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])],
      exerciseType: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])]
    });
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

    this.exerciseService.addExercise(this.exerciseForm.value)
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

  update() {
    this.submitted = true;

    console.log(this.exerciseForm.value);

    this.exerciseService.update(this.exerciseForm.value)
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
    this.exerciseService.deleteExercise(id).subscribe();
  }

}
