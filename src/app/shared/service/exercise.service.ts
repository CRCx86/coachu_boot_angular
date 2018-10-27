import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Exercise} from '../models/exercise';
import {Observable} from 'rxjs/Observable';
import {catchError, tap, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ExerciseService {

  exercise: Exercise;
  private exercisesUrl = '/api/exercise';

  constructor(private apiService: ApiService) { }

  getExercise(id: number) {
    const url = `${this.exercisesUrl}/${id}`;
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched exercise id=${id}`)),
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }

  getExercises() {
    return this.apiService.get(this.exercisesUrl  + '/all').pipe(
      tap(exercise => this.log(`fetched exercise`)),
      catchError(this.handleError('getExercises', []))
    );
  }

  update(exercise: Exercise) {
    return this.apiService.put(this.exercisesUrl + '/update', exercise).pipe(
      tap(_ => this.log(`update exercise id=${exercise.id}`)),
      catchError(this.handleError<any>('updateExercise'))
    )
  }

  addExercise(exercise: Exercise) {
    return this.apiService.post(this.exercisesUrl + '/create', exercise).pipe(
      tap(_ => this.log(`added exercise /w id=${exercise.id}`)),
      catchError(this.handleError<Exercise>('addExercise'))
    )
  }

  deleteExercise(exercise: Exercise | number) {
    const id = typeof exercise === 'number' ? exercise: exercise.id;
    const url = `${this.exercisesUrl}/${id}`;

    return this.apiService.delete(url).pipe(
      tap(_ => this.log(`deleted exercise id=${id}`)),
      catchError(this.handleError<Exercise>('deleteExercise'))
    );
  }

  searchExercise(term: string) {
    //const url = `${this.exercisesUrl}/?name=${term}`;
    //const url = `${this.exercisesUrl}/loadByName/${term}`;
    const url = `${this.exercisesUrl}/searchByName/?search=exercisename:${term}`;

    if (!term.trim()){
      return of([]);
    }

    return this.apiService.get(url).pipe(
      tap(_ => this.log(`found exercise matching "${term}"`)),
      catchError(this.handleError<Exercise[]>('searchExercise', []))
    );
  }

  private log(s: string) {
    console.log(s); // вывести для сообщения в бразуере
  }

  private handleError<T>(operation, result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
