import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroGruposPipe } from './filtro-grupos.pipe';



@NgModule({
  declarations: [FiltroGruposPipe],
  exports: [FiltroGruposPipe]
})
export class PipesModule { }
