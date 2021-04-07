import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdRestaurantePageRoutingModule } from './crowd-restaurante-routing.module';

import { CrowdRestaurantePage } from './crowd-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrowdRestaurantePageRoutingModule
  ],
  declarations: [CrowdRestaurantePage]
})
export class CrowdRestaurantePageModule {}
