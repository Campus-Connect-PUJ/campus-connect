import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendarRestaurantesPageRoutingModule } from './recomendar-restaurantes-routing.module';

import { RecomendarRestaurantesPage } from './recomendar-restaurantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendarRestaurantesPageRoutingModule
  ],
  declarations: [RecomendarRestaurantesPage]
})
export class RecomendarRestaurantesPageModule {}
