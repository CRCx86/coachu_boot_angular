import {Injectable} from '@angular/core';
import {Workout} from '../models/workout';
import {ApiService} from './api.service';
import {NgForm} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable()
export class WorkoutService {

  workout: Workout;
  workouts: Workout[];
  private workoutUrl = '/api/workout';

  constructor(private apiService: ApiService,
              private config: ConfigService) {}


  getWorkout(id: number) {
    const url = `${this.workoutUrl}/${id}`;
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched workout id=${id}`)),
      catchError(this.handleError<Workout>(`getWorkout id=${id}`))
    );
  }

  getWorkouts() {
    return this.apiService.get(this.workoutUrl  + '/all').pipe(
      tap(workout => this.log(`fetched workout` + workout)),
      catchError(this.handleError('getWorkouts', []))
    );
  }

  // устарела
  save(workout) {
    const workoutHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.workout_create_url, JSON.stringify(workout), workoutHeaders).map(() => {
        console.log("workout is created");
    }
    )
  }

  update(workout: Workout) {
    return this.apiService.put(this.workoutUrl + '/update', workout).pipe(
      tap(_ => this.log(`update workout id=${workout.id}`)),
      catchError(this.handleError<any>('updateWorkout'))
    )
  }

  addWorkout(workout: Workout) {

    const workoutHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.workoutUrl + 'create', workout, workoutHeaders).pipe(
      tap(_ => this.log(`added workout /w id=${workout.id}`)),
      catchError(this.handleError<Workout>('addWrokout'))
    )
  }

  deleteWorkout(workout: Workout | number) {
    const id = typeof workout === 'number' ? workout: workout.id;
    const url = `${this.workoutUrl}/${id}`;

    return this.apiService.delete(url).pipe(
      tap(_ => this.log(`deleted workout id=${id}`)),
      catchError(this.handleError<Workout>('deleteWorkout'))
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
