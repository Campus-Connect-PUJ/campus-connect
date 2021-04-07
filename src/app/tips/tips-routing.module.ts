import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipsPage } from './tips.page';

const routes: Routes = [
  {
    path: '',
    component: TipsPage
  },
  {
    path: 'tip-detalles',
    loadChildren: () => import('./tip-detalles/tip-detalles.module').then( m => m.TipDetallesPageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./tip-crear/tip-crear.module').then( m => m.TipCrearPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipsPageRoutingModule {}
