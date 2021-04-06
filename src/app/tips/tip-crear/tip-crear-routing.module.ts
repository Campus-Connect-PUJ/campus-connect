import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipCrearPage } from './tip-crear.page';

const routes: Routes = [
  {
    path: '',
    component: TipCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipCrearPageRoutingModule {}
