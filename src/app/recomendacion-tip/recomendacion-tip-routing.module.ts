import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendacionTipPage } from './recomendacion-tip.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendacionTipPage
  },  {
    path: 'agregar-tipo-aprendizaje',
    loadChildren: () => import('./agregar-tipo-aprendizaje/agregar-tipo-aprendizaje.module').then( m => m.AgregarTipoAprendizajePageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecomendacionTipPageRoutingModule {}
