import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoDetallesPageRoutingModule } from './foro-detalles-routing.module';

import { ForoDetallesPage } from './foro-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoDetallesPageRoutingModule
  ],
  declarations: [ForoDetallesPage]
})
export class ForoDetallesPageModule {}
