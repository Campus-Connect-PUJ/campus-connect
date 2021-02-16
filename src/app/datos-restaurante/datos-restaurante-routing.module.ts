import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosRestaurantePage } from './datos-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: DatosRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosRestaurantePageRoutingModule {}
