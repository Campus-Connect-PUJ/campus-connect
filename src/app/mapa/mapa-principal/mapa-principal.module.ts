import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaPrincipalPageRoutingModule } from './mapa-principal-routing.module';

import { MapaPrincipalPage } from './mapa-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPrincipalPageRoutingModule
  ],
  declarations: [MapaPrincipalPage]
})
export class MapaPrincipalPageModule {}
