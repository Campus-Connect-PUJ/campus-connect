import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSitiosDestinoPage } from './lista-sitios-destino.page';

const routes: Routes = [
  {
    path: '',
    component: ListaSitiosDestinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaSitiosDestinoPageRoutingModule {}
