import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTipoAprendizajePageRoutingModule } from './agregar-tipo-aprendizaje-routing.module';

import { AgregarTipoAprendizajePage } from './agregar-tipo-aprendizaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTipoAprendizajePageRoutingModule
  ],
  declarations: [AgregarTipoAprendizajePage]
})
export class AgregarTipoAprendizajePageModule {}
