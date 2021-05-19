import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorAsignaturaPageRoutingModule } from './monitor-asignatura-routing.module';

import { MonitorAsignaturaPage } from './monitor-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorAsignaturaPageRoutingModule
  ],
  declarations: [MonitorAsignaturaPage]
})
export class MonitorAsignaturaPageModule {}
