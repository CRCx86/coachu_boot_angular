import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardUserStatesComponent } from './api-card-user-states.component';

describe('ApiCardUserStatesComponent', () => {
  let component: ApiCardUserStatesComponent;
  let fixture: ComponentFixture<ApiCardUserStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCardUserStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardUserStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
