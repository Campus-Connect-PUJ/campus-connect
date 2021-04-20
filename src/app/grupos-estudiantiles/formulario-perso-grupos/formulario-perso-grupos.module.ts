import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPersoGruposPageRoutingModule } from './formulario-perso-grupos-routing.module';

import { FormularioPersoGruposPage } from './formulario-perso-grupos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPersoGruposPageRoutingModule
  ],
  declarations: [FormularioPersoGruposPage]
})
export class FormularioPersoGruposPageModule {}
