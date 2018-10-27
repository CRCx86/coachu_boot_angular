import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {PagesComponent} from './pages.component';
import {HeaderComponent} from './component/header';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {AccountMenuComponent} from './component/header/account-menu/account-menu.component';
import {NavComponent} from './nav/nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    TranslateModule,
    FlexLayoutModule
  ],
  declarations: [PagesComponent, HeaderComponent, SidebarComponent, AccountMenuComponent, NavComponent]
})
export class PagesModule { }
