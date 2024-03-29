import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoEstudiantil } from '../../../Model/GrupoEstudiantil/grupo-estudiantil';
import { GrupoEstudiantilService } from '../../../Model/GrupoEstudiantil/grupo-estudiantil.service';
import { DatosGrupoPageRoutingModule } from './datos-grupo-routing.module';

import { DatosGrupoPage } from './datos-grupo.page';

import {Router} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosGrupoPageRoutingModule
  ],
  declarations: [DatosGrupoPage]
})
export class DatosGrupoPageModule {


}
