import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaSitiosPageRoutingModule } from './lista-sitios-routing.module';

import { ListaSitiosPage } from './lista-sitios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaSitiosPageRoutingModule
  ],
  declarations: [ListaSitiosPage]
})
export class ListaSitiosPageModule {}
