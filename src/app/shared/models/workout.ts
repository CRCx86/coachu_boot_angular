import {Exercise} from './exercise';
import {WorkoutTypes} from './workout-types';
import {User} from './user';

export class Workout {

  id: number;
  title: string;
  workoutname: string;
  dateTimedescription: string;
  workoutTypes: WorkoutTypes[];
  exercises: Exercise[];
  description: string;
  user: User;
}
