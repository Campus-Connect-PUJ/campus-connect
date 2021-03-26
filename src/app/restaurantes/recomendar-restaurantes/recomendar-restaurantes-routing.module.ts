import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendarRestaurantesPage } from './recomendar-restaurantes.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendarRestaurantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendarRestaurantesPageRoutingModule {}
