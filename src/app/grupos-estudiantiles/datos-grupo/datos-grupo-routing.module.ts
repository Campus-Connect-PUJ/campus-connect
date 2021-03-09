import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosGrupoPage } from './datos-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: DatosGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosGrupoPageRoutingModule {}
