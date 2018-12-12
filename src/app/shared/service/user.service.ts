import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../models/user';
import {HttpHeaders} from '@angular/common/http';
import {Workout} from '../models/workout';
import {Friendship} from '../models/friendship';

@Injectable()
export class UserService {

  // https://stackblitz.com/edit/angular-7-registration-login-example?file=app%2F_services%2Fauthentication.service.ts

  currentUser;

  private friendshipUrl = '/api/friendships';

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) {
  }

  initUser() {
    const promise = this.apiService.get(this.config.refresh_token_url)
      .subscribe(
        res => {
          if (res.access_token !== null) {
            return this.getMyInfo()
              .subscribe(
                user => {
                  this.currentUser = user;
                },
                error => {
                  console.log('user service log' + JSON.stringify(error));
                });
          }
        },
        error => {
          this.currentUser = undefined;
          console.log('refresh_token_url log' + JSON.stringify(error));
        });
    return promise;
  }

  resetCredentials() {
    return this.apiService.get(this.config.reset_credentials_url);
  }

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url)
      .map(user => {
        if (user) {
          this.currentUser = user;
        }
      });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUser(id: number) {
    const url = `${this.config.user_url}/${id}`;
    console.log(url);
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<Workout>(`getUser id=${id}`))
    );
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }

  subscribe(friendship: Friendship) {

    const userHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.apiService.post(this.friendshipUrl + '/subscribe', friendship, userHeaders).pipe(
      tap(_ => this.log(`added subscribe /w id=${friendship.id}`)),
      catchError(this.handleError<User>('subscribe user'))
    )

  }

  getFriendShipStatus(id: number) {
    const url = `${this.friendshipUrl + '/status'}/${id}`;
    console.log(url);
    return this.apiService.get(url).pipe(
      tap(_ => this.log(`fetched friend id=${id}`)),
      catchError(this.handleError<Workout>(`getFriendShipStatus id=${id}`))
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
