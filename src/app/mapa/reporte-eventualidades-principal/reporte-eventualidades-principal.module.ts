import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteEventualidadesPrincipalPageRoutingModule } from './reporte-eventualidades-principal-routing.module';

import { ReporteEventualidadesPrincipalPage } from './reporte-eventualidades-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteEventualidadesPrincipalPageRoutingModule
  ],
  declarations: [ReporteEventualidadesPrincipalPage]
})
export class ReporteEventualidadesPrincipalPageModule {}
