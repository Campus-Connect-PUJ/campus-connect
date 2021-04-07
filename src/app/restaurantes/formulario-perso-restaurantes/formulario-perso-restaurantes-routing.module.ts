import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioPersoRestaurantesPage } from './formulario-perso-restaurantes.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioPersoRestaurantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioPersoRestaurantesPageRoutingModule {}
