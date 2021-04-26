import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestAprendizajePage } from './test-aprendizaje.page';

const routes: Routes = [
  {
    path: '',
    component: TestAprendizajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestAprendizajePageRoutingModule {}
