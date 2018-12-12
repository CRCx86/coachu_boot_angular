import {Exercise} from './exercise';
import {WorkoutTypes} from './workout-types';
import {User} from './user';
import {Time} from '@angular/common';

export class Workout {

  id: number;
  title: string;
  workoutName: string;
  dateTime: Date;
  workoutTypes: WorkoutTypes[];
  exercises: Exercise[];
  description: string;
  sets: number;
  user: User;
  workoutStyle: string;
  instructions: string;
  timeLimit: number;
  totalTime: number;
  repetitions: number;
}
