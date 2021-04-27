import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugeGruposPage } from './suge-grupos.page';

const routes: Routes = [
  {
    path: '',
    component: SugeGruposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugeGruposPageRoutingModule {}
