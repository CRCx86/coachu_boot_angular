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
  private exercisesBookUrl = '/api/exercisesBook';
  private exercisesTypesUrl = '/api/exerciseTypes';

  constructor(private apiService: ApiService) { }

  getExercise(id: number) {
    const url = `${this.exercisesUrl}/${id}`;
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched exercise id=${id}`)),
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }

  getExerciseByName(exercise: string) {
    const url = `${this.exercisesUrl + '/loadByName'}/${exercise}`;
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched exercise name=${exercise}`)),
      catchError(this.handleError<Exercise>(`getExercise name=${exercise}`))
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
    const url = `${this.exercisesUrl}/searchByName/?search=exerciseName:${term}`;

    if (!term.trim()){
      return of([]);
    }

    return this.apiService.get(url).pipe(
      tap(_ => this.log(`found exercise matching "${term}"`)),
      catchError(this.handleError<Exercise[]>('searchExercise', []))
    );
  }

  getExercisesBook() {
    return this.apiService.get(this.exercisesBookUrl  + '/all').pipe(
      tap(exercise => this.log(`fetched exercise`)),
      catchError(this.handleError('getExercises', []))
    );
  }

  getExerciseBook(id: number) {
    const url = `${this.exercisesBookUrl}/${id}`;
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched exercise id=${id}`)),
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }

  getExerciseBookByName(exercise: string) {
    const url = `${this.exercisesBookUrl + '/loadByName'}/${exercise}`;
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched exercise name=${exercise}`)),
      catchError(this.handleError<Exercise>(`getExercise name=${exercise}`))
    );
  }

  addExerciseBook(exercise: Exercise) {
    return this.apiService.post(this.exercisesBookUrl + '/create', exercise).pipe(
      tap(_ => this.log(`added exercise /w id=${exercise.id}`)),
      catchError(this.handleError<Exercise>('addExercise'))
    )
  }

  searchExerciseBook(term: string) {
    const url = `${this.exercisesBookUrl}/searchByName/?search=exerciseName:${term}`;

    if (!term.trim()){
      return of([]);
    }

    return this.apiService.get(url).pipe(
      tap(_ => this.log(`found exercise matching "${term}"`)),
      catchError(this.handleError<Exercise[]>('searchExercise', []))
    );
  }

  deleteExerciseBook(exercise: Exercise | number) {
    const id = typeof exercise === 'number' ? exercise: exercise.id;
    const url = `${this.exercisesBookUrl}/${id}`;

    return this.apiService.delete(url).pipe(
      tap(_ => this.log(`deleted exercise id=${id}`)),
      catchError(this.handleError<Exercise>('deleteExercise'))
    );
  }

  getExercisesTypes() {
    return this.apiService.get(this.exercisesTypesUrl  + '/all').pipe(
      tap(exercise => this.log(`fetched exercise types`)),
      catchError(this.handleError('getExercisesTypes', []))
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
