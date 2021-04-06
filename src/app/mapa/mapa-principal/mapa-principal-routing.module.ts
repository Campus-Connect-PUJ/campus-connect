import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaPrincipalPage } from './mapa-principal.page';

const routes: Routes = [
  {
    path: '',
    component: MapaPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaPrincipalPageRoutingModule {}
