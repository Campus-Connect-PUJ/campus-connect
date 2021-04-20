import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorHorariosPageRoutingModule } from './monitor-horarios-routing.module';

import { MonitorHorariosPage } from './monitor-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorHorariosPageRoutingModule
  ],
  declarations: [MonitorHorariosPage]
})
export class MonitorHorariosPageModule {}
