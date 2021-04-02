import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';
import { FiltroTipsPipe } from './filtro-tips.pipe';
import { FiltroForosPipe } from './filtro-foros.pipe';
import { FiltroRestaurantesPipe } from './filtro-restaurantes.pipe';
import { FiltroRestaurantesTipoComidaPipe } from './filtro-restaurantes-tipo-comida.pipe';

@NgModule({

  declarations: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe,
    FiltroRestaurantesTipoComidaPipe
  ],
  exports: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe,
    FiltroRestaurantesTipoComidaPipe
  ]
})
export class PipesModule { }
