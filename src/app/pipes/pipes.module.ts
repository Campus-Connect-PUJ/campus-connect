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
import { FiltroCaracteristicasPipe } from './filtro-caracteristicas.pipe';
import { FiltroTipsExigenciaPipe } from './filtro-tips-exigencia.pipe';

@NgModule({

  declarations: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe, 
    FiltroTipsAprendizajePipe,
    FiltroRestaurantesTipoComidaPipe,
    FiltroRestaurantesPrecioPipe,
    FiltroRestauranteTiempoPipe,
    FiltroFacultadGruposPipe,
    FiltroTematicaGurposPipe,
    FiltroCaracteristicasPipe,
    FiltroTipsExigenciaPipe
  ],
  exports: [
    FiltroGruposPipe,
    FiltroRestaurantesPipe,
    FiltroTipsPipe, 
    FiltroForosPipe,
    FiltroTipsAprendizajePipe,
    FiltroRestaurantesTipoComidaPipe,
    FiltroRestaurantesPrecioPipe,
    FiltroRestauranteTiempoPipe,
    FiltroFacultadGruposPipe,
    FiltroTematicaGurposPipe,
    FiltroCaracteristicasPipe,
    FiltroTipsExigenciaPipe
  ]
})
export class PipesModule { }
