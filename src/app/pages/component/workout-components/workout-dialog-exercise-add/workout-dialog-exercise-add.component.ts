import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Exercise} from '../../../../shared/models/exercise';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ExerciseService} from '../../../../shared/service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-workout-dialog-exercise-add',
  templateUrl: './workout-dialog-exercise-add.component.html',
  styleUrls: ['./workout-dialog-exercise-add.component.css']
})
export class WorkoutDialogExerciseAddComponent implements OnInit {

  exercise$: Observable<Exercise[]>;

  private searchTerms = new Subject<string>();

  constructor(public dialogRef: MatDialogRef<WorkoutDialogExerciseAddComponent>,
              @Inject(MAT_DIALOG_DATA) public exercise: Exercise,
              private exerciseService: ExerciseService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.exercise$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.exerciseService.searchExercise(term)),
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
