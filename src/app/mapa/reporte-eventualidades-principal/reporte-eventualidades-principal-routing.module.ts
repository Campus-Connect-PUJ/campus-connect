import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteEventualidadesPrincipalPage } from './reporte-eventualidades-principal.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteEventualidadesPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteEventualidadesPrincipalPageRoutingModule {}
