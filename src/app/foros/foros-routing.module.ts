import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForosPage } from './foros.page';

const routes: Routes = [
  {
    path: '',
    component: ForosPage
  },  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForosPageRoutingModule {}
