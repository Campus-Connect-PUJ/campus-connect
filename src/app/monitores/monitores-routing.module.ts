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
        children: [
          {
            path: "",
            loadChildren: () => import('./monitor-horarios/monitor-horarios.module').then( m => m.MonitorHorariosPageModule)
          },
          {
            path: "monitor-asignatura",
            children: [
              {
                path: ":asignaturaID",
                loadChildren: () => import('./monitor-asignatura/monitor-asignatura.module').then( m => m.MonitorAsignaturaPageModule)
              }
            ] 
          }
        ]
      },
      {
        path: "",
        loadChildren: () => import('./monitor-horarios/monitor-horarios.module').then( m => m.MonitorHorariosPageModule)
      },
 
    ]
  },


  {
    path: "monitor-asignatura",
    children: [
      {
        path: ":asignaturaID",
        loadChildren: () => import('./monitor-asignatura/monitor-asignatura.module').then( m => m.MonitorAsignaturaPageModule)
      }
    ]
  },



/*
  {
    path: 'monitor-asignatura',
    loadChildren: () => import('./monitor-asignatura/monitor-asignatura.module').then( m => m.MonitorAsignaturaPageModule)
  }
*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoresPageRoutingModule {}
