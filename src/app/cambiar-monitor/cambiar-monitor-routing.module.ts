import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarMonitorPage } from './cambiar-monitor.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarMonitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarMonitorPageRoutingModule {}
