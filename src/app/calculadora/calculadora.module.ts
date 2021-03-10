import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculadoraPageRoutingModule } from './calculadora-routing.module';

import { CalculadoraPage } from './calculadora.page';
import { PruebaComponent } from '../prueba/prueba.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculadoraPageRoutingModule
  ],
  declarations: [CalculadoraPage, PruebaComponent ]
})
export class CalculadoraPageModule {}
