import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteEventualidadesPageRoutingModule } from './reporte-eventualidades-routing.module';

import { ReporteEventualidadesPage } from './reporte-eventualidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteEventualidadesPageRoutingModule
  ],
  declarations: [ReporteEventualidadesPage]
})
export class ReporteEventualidadesPageModule {}
