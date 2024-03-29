import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContribucionesPage } from './contribuciones.page';

const routes: Routes = [
  {
    path: '',
    component: ContribucionesPage
  },
  {
    path: 'foros',
    children:[
      {
        path: ":usuarioId",
        loadChildren: () => import('./foros/foros.module').then(m => m.ForosPageModule)
      }
    ]
  },
  {
    path: 'tips',
    children:[
      {
        path: ":usuarioId",
        loadChildren: () => import('./tips/tips.module').then(m => m.TipsPageModule)
      }
    ]
  },
  {
    path: 'respuestas-foro',
    children: [
      {
        path: ":usuarioId",
        loadChildren: () => import('./respuestas-foro/respuestas-foro.module').then(m => m.RespuestasForoPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContribucionesPageRoutingModule {}
