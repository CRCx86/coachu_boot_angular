import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDialogExerciseAddComponent } from './workout-dialog-exercise-add.component';

describe('WorkoutDialogExerciseAddComponent', () => {
  let component: WorkoutDialogExerciseAddComponent;
  let fixture: ComponentFixture<WorkoutDialogExerciseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutDialogExerciseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDialogExerciseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
