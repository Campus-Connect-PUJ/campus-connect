import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasPrincipalPage } from './sugerencias-principal.page';

const routes: Routes = [
  {
    path: '',
    component: SugerenciasPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerenciasPrincipalPageRoutingModule {}
