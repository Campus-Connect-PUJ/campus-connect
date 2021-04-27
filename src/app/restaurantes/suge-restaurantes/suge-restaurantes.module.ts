import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugeRestaurantesPageRoutingModule } from './suge-restaurantes-routing.module';

import { SugeRestaurantesPage } from './suge-restaurantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugeRestaurantesPageRoutingModule
  ],
  declarations: [SugeRestaurantesPage]
})
export class SugeRestaurantesPageModule {}
