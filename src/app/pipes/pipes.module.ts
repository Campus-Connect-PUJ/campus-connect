import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';
import { FiltroTipsPipe } from './filtro-tips.pipe';
import { FiltroForosPipe } from './filtro-foros.pipe';
import { FiltroRestaurantesPipe } from './filtro-restaurantes.pipe';
import { FiltroTipsAprendizajePipe } from './filtro-tips-aprendizaje.pipe';

@NgModule({

  declarations: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe, 
    FiltroTipsAprendizajePipe
  ],
  exports: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe,
    FiltroTipsAprendizajePipe
  ]
})
export class PipesModule { }
