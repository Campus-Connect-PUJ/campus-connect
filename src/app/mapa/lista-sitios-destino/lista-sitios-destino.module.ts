import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaSitiosDestinoPageRoutingModule } from './lista-sitios-destino-routing.module';

import { ListaSitiosDestinoPage } from './lista-sitios-destino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaSitiosDestinoPageRoutingModule
  ],
  declarations: [ListaSitiosDestinoPage]
})
export class ListaSitiosDestinoPageModule {}
