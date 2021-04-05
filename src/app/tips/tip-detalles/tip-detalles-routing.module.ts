import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipDetallesPage } from './tip-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: TipDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipDetallesPageRoutingModule {}
