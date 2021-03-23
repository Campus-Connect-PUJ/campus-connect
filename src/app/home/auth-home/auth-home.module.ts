import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthHomePageRoutingModule } from './auth-home-routing.module';

import { AuthHomePage } from './auth-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthHomePageRoutingModule
  ],
  declarations: [AuthHomePage]
})
export class AuthHomePageModule {}
