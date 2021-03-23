import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugerenciasPrincipalPageRoutingModule } from './sugerencias-principal-routing.module';

import { SugerenciasPrincipalPage } from './sugerencias-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugerenciasPrincipalPageRoutingModule
  ],
  declarations: [SugerenciasPrincipalPage]
})
export class SugerenciasPrincipalPageModule {}
