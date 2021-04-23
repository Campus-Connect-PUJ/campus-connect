import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForosPage } from './foros.page';

const routes: Routes = [
  {
    path: '',
    component: ForosPage
  },
  {
    path: 'foro-crear',
    loadChildren: () => import('./foro-crear/foro-crear.module').then( m => m.ForoCrearPageModule)
  },
  {
    path: 'foro-detalles',
    loadChildren: () => import('./foro-detalles/foro-detalles.module').then( m => m.ForoDetallesPageModule)
  },  {
    path: 'respuestas',
    loadChildren: () => import('./respuestas/respuestas.module').then( m => m.RespuestasPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForosPageRoutingModule {}
