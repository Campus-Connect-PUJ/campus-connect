import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTipoAprendizajePage } from './agregar-tipo-aprendizaje.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTipoAprendizajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTipoAprendizajePageRoutingModule {}
