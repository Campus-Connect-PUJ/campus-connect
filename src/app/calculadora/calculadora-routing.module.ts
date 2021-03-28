import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculadoraPage } from './calculadora.page';
const routes: Routes = [
  {
    path: '',
    component: CalculadoraPage
  },
  {
    path: 'ingresar-notas',
    children:[
      {
        path: "",
        loadChildren: () => import('./ingresar-notas/ingresar-notas.module').then(m => m.IngresarNotasPageModule)
      },
      {
        path: ":tipId",
        loadChildren: () => import('./ingresar-notas/ingresar-notas.module').then(m => m.IngresarNotasPageModule)
      }
    ]
  },
  {
    path: 'resultado',
    children:[
      {
        path: "",
        loadChildren: () => import('./resultado/resultado.module').then( m => m.ResultadoPageModule)
      },
      {
        path: ":tipId",
        loadChildren: () => import('./resultado/resultado.module').then( m => m.ResultadoPageModule)
      }
    ]
  },
  {
    path: 'materias',
    loadChildren: () => import('./materias/materias.module').then( m => m.MateriasPageModule)
  },
  {
    path: 'alerta',
    loadChildren: () => import('./alerta/alerta.module').then( m => m.AlertaPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculadoraPageRoutingModule {}