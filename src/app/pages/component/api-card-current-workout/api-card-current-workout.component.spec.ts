import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardCurrentWorkoutComponent } from './api-card-current-workout.component';

describe('ApiCardCurrentWorkoutComponent', () => {
  let component: ApiCardCurrentWorkoutComponent;
  let fixture: ComponentFixture<ApiCardCurrentWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCardCurrentWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardCurrentWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
