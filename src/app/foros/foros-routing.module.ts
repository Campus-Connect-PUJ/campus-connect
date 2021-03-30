import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForosPage } from './foros.page';

const routes: Routes = [
  {
    path: '',
    component: ForosPage
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'foro-detalles',
    loadChildren: () => import('./foro-detalles/foro-detalles.module').then( m => m.ForoDetallesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForosPageRoutingModule {}
