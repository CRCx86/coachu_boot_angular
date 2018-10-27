import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutMovementsStyleDashboardComponent } from './workout-movements-style-dashboard.component';

describe('WorkoutMovementsStyleDashboardComponent', () => {
  let component: WorkoutMovementsStyleDashboardComponent;
  let fixture: ComponentFixture<WorkoutMovementsStyleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutMovementsStyleDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutMovementsStyleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
