import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSitiosPage } from './lista-sitios.page';

const routes: Routes = [
  {
    path: '',
    component: ListaSitiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaSitiosPageRoutingModule {}
