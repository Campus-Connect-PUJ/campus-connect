import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipDetallesPageRoutingModule } from './tip-detalles-routing.module';

import { TipDetallesPage } from './tip-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipDetallesPageRoutingModule
  ],
  declarations: [TipDetallesPage]
})
export class TipDetallesPageModule {}
