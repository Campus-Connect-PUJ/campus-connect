import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'servicios-academicos',
        loadChildren: '../servicios-academicos/servicios-academicos.module#ServiciosAcademicosPageModule'
      },
      {
        path: 'contribuciones',
        loadChildren: '../contribuciones/contribuciones.module#ContribucionesPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
