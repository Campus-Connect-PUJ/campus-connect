import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoDetallesPage } from './foro-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ForoDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoDetallesPageRoutingModule {}
