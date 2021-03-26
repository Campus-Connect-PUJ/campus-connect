import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPersoRestaurantesPageRoutingModule } from './formulario-perso-restaurantes-routing.module';

import { FormularioPersoRestaurantesPage } from './formulario-perso-restaurantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPersoRestaurantesPageRoutingModule
  ],
  declarations: [FormularioPersoRestaurantesPage]
})
export class FormularioPersoRestaurantesPageModule {}
