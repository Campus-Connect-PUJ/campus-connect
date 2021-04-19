import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContribucionesPage } from './contribuciones.page';

const routes: Routes = [
  {
    path: '',
    component: ContribucionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContribucionesPageRoutingModule {}
