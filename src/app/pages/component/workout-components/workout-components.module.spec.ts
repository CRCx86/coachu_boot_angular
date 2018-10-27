import { WorkoutComponentsModule } from './workout-components.module';

describe('WorkoutComponentsModule', () => {
  let workoutComponentsModule: WorkoutComponentsModule;

  beforeEach(() => {
    workoutComponentsModule = new WorkoutComponentsModule();
  });

  it('should create an instance', () => {
    expect(workoutComponentsModule).toBeTruthy();
  });
});
