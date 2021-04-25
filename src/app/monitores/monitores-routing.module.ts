import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoresPage } from './monitores.page';

const routes: Routes = [
  {
    path: '',
    component: MonitoresPage
  },
  {
    path: "horarios-monitor",
    children: [
      {
        path: ":monitorID",
        loadChildren: () => import('./monitor-horarios/monitor-horarios.module').then( m => m.MonitorHorariosPageModule)
      },
      {
        path: "",
        loadChildren: () => import('./monitor-horarios/monitor-horarios.module').then( m => m.MonitorHorariosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoresPageRoutingModule {}
