import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosGrupoPageRoutingModule } from './datos-grupo-routing.module';

import { DatosGrupoPage } from './datos-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosGrupoPageRoutingModule
  ],
  declarations: [DatosGrupoPage]
})
export class DatosGrupoPageModule {}
