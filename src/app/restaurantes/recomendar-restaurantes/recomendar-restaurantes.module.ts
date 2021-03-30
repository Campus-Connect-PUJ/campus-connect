import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecomendarRestaurantesPageRoutingModule } from './recomendar-restaurantes-routing.module';

import { RecomendarRestaurantesPage } from './recomendar-restaurantes.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RecomendarRestaurantesPageRoutingModule
  ],
  exports:[RecomendarRestaurantesPage],
  declarations: [RecomendarRestaurantesPage]

})
export class RecomendarRestaurantesPageModule {}
