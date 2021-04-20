import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorHorariosPage } from './monitor-horarios.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorHorariosPage
  },
  /*
  {
    path: "horarios-monitor",
    children: [
      {
        path: ":monitorID",
        loadChildren: () =>
          import(
            './monitor-horarios.module'
          ).then((m) => m.MonitorHorariosPageModule),
      }
    ],
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorHorariosPageRoutingModule {}
