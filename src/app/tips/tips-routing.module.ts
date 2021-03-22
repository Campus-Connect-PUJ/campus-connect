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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipsPageRoutingModule {}
