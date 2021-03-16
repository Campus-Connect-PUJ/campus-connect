import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';
import { FiltroTipsPipe } from './filtro-tips.pipe';



@NgModule({
  declarations: [FiltroGruposPipe, FiltroTipsPipe],
  exports: [FiltroGruposPipe, FiltroTipsPipe]
})
export class PipesModule { }
