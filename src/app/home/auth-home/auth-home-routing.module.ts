import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthHomePage } from './auth-home.page';

const routes: Routes = [
  {
    path: '',
    component: AuthHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthHomePageRoutingModule {}
