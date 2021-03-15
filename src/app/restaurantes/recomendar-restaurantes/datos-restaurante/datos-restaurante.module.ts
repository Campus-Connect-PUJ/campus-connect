import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosRestaurantePageRoutingModule } from './datos-restaurante-routing.module';

import { DatosRestaurantePage } from './datos-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosRestaurantePageRoutingModule
  ],
  declarations: [DatosRestaurantePage]
})
export class DatosRestaurantePageModule {}
