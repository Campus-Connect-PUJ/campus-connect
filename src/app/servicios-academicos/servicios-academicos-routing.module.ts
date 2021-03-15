import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosAcademicosPage } from './servicios-academicos.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosAcademicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosAcademicosPageRoutingModule {}
