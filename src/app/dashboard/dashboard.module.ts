import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    PanelModule,
    ChartModule,
    CalendarModule,
    ButtonModule,

    SharedModule,
    DashboardRoutingModule
  ],
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule { }
