import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaRutaPage } from './mapa-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: MapaRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaRutaPageRoutingModule {}
