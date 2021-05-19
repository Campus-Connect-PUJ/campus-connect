import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugeRestaurantesPage } from './suge-restaurantes.page';

const routes: Routes = [
  {
    path: '',
    component: SugeRestaurantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugeRestaurantesPageRoutingModule {}
