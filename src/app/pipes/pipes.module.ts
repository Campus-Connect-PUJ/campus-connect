import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';
import { FiltroTipsPipe } from './filtro-tips.pipe';
import { FiltroForosPipe } from './filtro-foros.pipe';



@NgModule({
  declarations: [FiltroGruposPipe, FiltroTipsPipe, FiltroForosPipe],
  exports: [FiltroGruposPipe, FiltroTipsPipe, FiltroForosPipe]
})
export class PipesModule { }
