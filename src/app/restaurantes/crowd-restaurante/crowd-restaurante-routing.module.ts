import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdRestaurantePage } from './crowd-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdRestaurantePageRoutingModule {}
