import {BrowserModule} from '@angular/platform-browser';
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
  MatProgressSpinnerModule,
  MatRadioModule, MatTableModule, MAT_DIALOG_DATA, MatPaginatorModule, MatSortModule,
} from '@angular/material';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginGuard, GuestGuard, AdminGuard} from './pages/guard';
import {NotFoundComponent} from './pages/not-found';

import {
  ApiService,
  AuthService,
  UserService,
  ConfigService
} from './shared/service';

import {ChangePasswordComponent} from './pages/change-password';
import {ForbiddenComponent} from './pages/forbidden/forbidden.component';
import {AdminComponent} from './pages/admin';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ExerciseService} from './shared/service';
import {WorkoutService} from './shared/service';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WorkoutStyleDashboardComponent} from './pages/component/workout-components/workout-style-dashboard/workout-style-dashboard.component';
import {UserDetailsComponent} from './pages/component/user-details/user-details.component';

export function initUserFactory(userService: UserService) {
  return () => userService.initUser();
}

export const createTranslateHttpLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ChangePasswordComponent,
    ForbiddenComponent,
    AdminComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatRadioModule,
    MatTableModule,
    CdkTableModule,
    FlexLayoutModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateHttpLoader,
        deps:[HttpClient]
      }
    })
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
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
