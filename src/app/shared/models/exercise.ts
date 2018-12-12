import {ExerciseType} from './exercise-type';

export class Exercise {

  id: number;
  exerciseName: string;
  description: string;
  exerciseTypes: ExerciseType[];
  repetitions: number;
  weights: number;
  sets: number

}
