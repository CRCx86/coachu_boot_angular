import { ExerciseComponentsModule } from './exercise-components.module';

describe('ExerciseComponentsModule', () => {
  let exerciseComponentsModule: ExerciseComponentsModule;

  beforeEach(() => {
    exerciseComponentsModule = new ExerciseComponentsModule();
  });

  it('should create an instance', () => {
    expect(exerciseComponentsModule).toBeTruthy();
  });
});
