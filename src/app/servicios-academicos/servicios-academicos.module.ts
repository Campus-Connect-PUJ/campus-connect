import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosAcademicosPageRoutingModule } from './servicios-academicos-routing.module';

import { ServiciosAcademicosPage } from './servicios-academicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosAcademicosPageRoutingModule,
    IonicModule
  ],
  declarations: [ServiciosAcademicosPage]
})
export class ServiciosAcademicosPageModule {}
