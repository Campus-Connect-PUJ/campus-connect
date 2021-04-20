import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContribucionesPageRoutingModule } from './contribuciones-routing.module';

import { ContribucionesPage } from './contribuciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContribucionesPageRoutingModule
  ],
  declarations: [ContribucionesPage]
})
export class ContribucionesPageModule {}
