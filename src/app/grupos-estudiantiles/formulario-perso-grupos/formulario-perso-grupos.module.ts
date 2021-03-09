import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPersoGruposPageRoutingModule } from './formulario-perso-grupos-routing.module';

import { FormularioPersoGruposPage } from './formulario-perso-grupos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPersoGruposPageRoutingModule
  ],
  declarations: [FormularioPersoGruposPage]
})
export class FormularioPersoGruposPageModule {}
