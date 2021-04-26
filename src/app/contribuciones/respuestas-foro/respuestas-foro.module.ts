import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestasForoPageRoutingModule } from './respuestas-foro-routing.module';

import { RespuestasForoPage } from './respuestas-foro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestasForoPageRoutingModule
  ],
  declarations: [RespuestasForoPage]
})
export class RespuestasForoPageModule {}
