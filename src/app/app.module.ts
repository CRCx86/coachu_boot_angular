import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

// material
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatInputModule,
  MatIconRegistry,
  MatProgressSpinnerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard, GuestGuard, AdminGuard } from './guard';
import { NotFoundComponent } from './not-found';
import { AccountMenuComponent } from './component/header/account-menu/account-menu.component';
import {
  HeaderComponent,
  ApiCardComponent,
  FooterComponent
} from './component';

import {
  ApiService,
  AuthService,
  UserService,
  ConfigService
} from './service';

import { ChangePasswordComponent } from './change-password';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin';
import { SignupComponent } from './signup/signup.component';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MockApiService, MockUserService} from './service/mocks';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { WorkoutsComponent } from './component/workouts/workouts.component';
import { WorkoutDetailsComponent } from './component/workout-details/workout-details.component';
import { ExercisesComponent } from './component/exercises/exercises.component';
import { ExerciseDetailsComponent } from './component/exercise-details/exercise-details.component';
import {ExerciseService} from './service/exercise.service';
import {WorkoutService} from './service/workout.service';

export function initUserFactory(userService: UserService) {
  return () => userService.initUser();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ApiCardComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    AccountMenuComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    AdminComponent,
    SignupComponent,
    UserDetailsComponent,
    WorkoutsComponent,
    WorkoutDetailsComponent,
    ExercisesComponent,
    ExerciseDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  providers: [
    LoginGuard,
    GuestGuard,
    AdminGuard,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
    MatIconRegistry,
    ExerciseService,
    WorkoutService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': initUserFactory,
      'deps': [UserService],
      'multi': true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
