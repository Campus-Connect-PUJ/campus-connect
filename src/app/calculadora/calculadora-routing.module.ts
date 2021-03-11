import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculadoraPage } from './calculadora.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraPage
  },  {
    path: 'ingresar-notas',
    loadChildren: () => import('./ingresar-notas/ingresar-notas.module').then( m => m.IngresarNotasPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculadoraPageRoutingModule {}
