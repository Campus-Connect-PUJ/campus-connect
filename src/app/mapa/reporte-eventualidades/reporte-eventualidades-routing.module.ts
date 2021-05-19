import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteEventualidadesPage } from './reporte-eventualidades.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteEventualidadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteEventualidadesPageRoutingModule {}
