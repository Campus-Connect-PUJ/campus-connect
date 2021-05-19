import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorAsignaturaPage } from './monitor-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorAsignaturaPageRoutingModule {}
