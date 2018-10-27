import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import {FlexLayoutModule} from '@angular/flex-layout';

import {ChartsComponent} from './charts.component';

import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsRoutingModule,
    Ng2Charts,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  declarations: [ChartsComponent]
})
export class ChartsModule { }
