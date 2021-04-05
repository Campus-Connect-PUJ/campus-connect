import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';
import { FiltroTipsPipe } from './filtro-tips.pipe';
import { FiltroForosPipe } from './filtro-foros.pipe';
import { FiltroRestaurantesPipe } from './filtro-restaurantes.pipe';
import { FiltroTipsAprendizajePipe } from './filtro-tips-aprendizaje.pipe';
import { FiltroRestaurantesTipoComidaPipe } from './filtro-restaurantes-tipo-comida.pipe';
import { FiltroRestaurantesPrecioPipe } from './filtro-restaurantes-precio.pipe';
import { FiltroRestauranteTiempoPipe } from './filtro-restaurante-tiempo.pipe';
import { FiltroFacultadGruposPipe } from './filtro-facultad-grupos.pipe';
import { FiltroTematicaGurposPipe } from './filtro-tematica-gurpos.pipe';

@NgModule({

  declarations: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe, 
    FiltroTipsAprendizajePipe
    FiltroForosPipe,
    FiltroRestaurantesTipoComidaPipe,
    FiltroRestaurantesPrecioPipe,
    FiltroRestauranteTiempoPipe,
    FiltroFacultadGruposPipe,
    FiltroTematicaGurposPipe
  ],
  exports: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe,
    FiltroTipsAprendizajePipe
    FiltroRestaurantesTipoComidaPipe,
    FiltroRestaurantesPrecioPipe,
    FiltroRestauranteTiempoPipe,
    FiltroFacultadGruposPipe,
    FiltroTematicaGurposPipe
  ]
})
export class PipesModule { }
