import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Exercise} from '../component/exercise';

@Injectable()
export class ExerciseService {

  exercise: Exercise;
  exerciseList: Exercise[];
  private exercisesUrl = '/api/exercise';

  constructor(private apiService: ApiService) { }

  getExercise(id: number) {
    const url = `${this.exercisesUrl}/${id}`;
    return this.apiService.get(url).map(exercise => this.exercise = exercise);
  }

  getExercises() {
    return this.apiService.get(this.exercisesUrl  + '/all');
  }
}
