import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendacionTipPage } from './recomendacion-tip.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendacionTipPage
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendacionTipPageRoutingModule {}
