import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipCrearPageRoutingModule } from './tip-crear-routing.module';

import { TipCrearPage } from './tip-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipCrearPageRoutingModule
  ],
  declarations: [TipCrearPage]
})
export class TipCrearPageModule {}
