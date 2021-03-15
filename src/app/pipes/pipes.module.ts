import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';
import { FiltroRestaurantesPipe } from './filtro-restaurantes.pipe';



@NgModule({
  declarations: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe
  ],
  exports: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe
  ]
})
export class PipesModule { }
