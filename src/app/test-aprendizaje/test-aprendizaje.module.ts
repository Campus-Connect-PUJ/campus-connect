import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestAprendizajePageRoutingModule } from './test-aprendizaje-routing.module';

import { TestAprendizajePage } from './test-aprendizaje.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TestAprendizajePageRoutingModule
  ],
  declarations: [TestAprendizajePage]
})
export class TestAprendizajePageModule {}
