import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoCrearPageRoutingModule } from './foro-crear-routing.module';

import { ForoCrearPage } from './foro-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoCrearPageRoutingModule
  ],
  declarations: [ForoCrearPage]
})
export class ForoCrearPageModule {}
