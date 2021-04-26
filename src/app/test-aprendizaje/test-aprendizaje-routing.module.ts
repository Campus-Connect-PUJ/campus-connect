import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestAprendizajePage } from './test-aprendizaje.page';

const routes: Routes = [
  {
    path: '',
    component: TestAprendizajePage
  },
  {
    path: 'resultado',
    loadChildren: () => import('./resultado/resultado.module').then( m => m.ResultadoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestAprendizajePageRoutingModule {}
