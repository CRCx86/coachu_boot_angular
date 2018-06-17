import {Injectable} from '@angular/core';
import {Workout} from '../component/workout';
import {ApiService} from './api.service';

@Injectable()
export class WorkoutService {

  workout: Workout;
  workouts: Workout[];
  private workoutUrl = '/api/workout';

  constructor(private apiService: ApiService) {}

  getWorkout(id: number) {
    const url = `${this.workoutUrl}/${id}`;
    return this.apiService.get(url).map(workout => this.workout = workout);
  }

  getWorkouts() {
    return this.apiService.get(this.workoutUrl  + '/all');
  }

}
