import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoCrearPage } from './foro-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ForoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoCrearPageRoutingModule {}
