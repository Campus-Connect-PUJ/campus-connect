import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoGruposPage } from './reco-grupos.page';

const routes: Routes = [
  {
    path: '',
    component: RecoGruposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoGruposPageRoutingModule {}
