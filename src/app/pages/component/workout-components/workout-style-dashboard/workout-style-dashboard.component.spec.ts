import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutStyleDashboardComponent } from './workout-style-dashboard.component';

describe('WorkoutStyleDashboardComponent', () => {
  let component: WorkoutStyleDashboardComponent;
  let fixture: ComponentFixture<WorkoutStyleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutStyleDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutStyleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
