import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardWorkoutNewsComponent } from './api-card-workout-news.component';

describe('ApiCardWorkoutNewsComponent', () => {
  let component: ApiCardWorkoutNewsComponent;
  let fixture: ComponentFixture<ApiCardWorkoutNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCardWorkoutNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardWorkoutNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
