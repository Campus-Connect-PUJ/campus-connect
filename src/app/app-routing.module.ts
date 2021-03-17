import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GruposEstudiantilesComponent } from './components/grupos-estudiantiles/grupos-estudiantiles.component';

const routes: Routes = [
  { path: 'grupos_estudiantiles', component: GruposEstudiantilesComponent },
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'calculadora',
    loadChildren: () => import('./calculadora/calculadora.module').then( m => m.CalculadoraPageModule)
  },
  {
    path: 'reco-grupos',
    children: [
      {
        path:"",
        loadChildren: () => import('./grupos-estudiantiles/reco-grupos/reco-grupos.module').then( m => m.RecoGruposPageModule)
      },
      {
        path: ":grupoID",
        loadChildren: () => import('./grupos-estudiantiles/reco-grupos/datos-grupo/datos-grupo.module').then( m => m.DatosGrupoPageModule)
      }
    ]
  },
  {
    path: 'formulario-perso-grupos',
    loadChildren: () => import('./grupos-estudiantiles/formulario-perso-grupos/formulario-perso-grupos.module').then( m => m.FormularioPersoGruposPageModule)
  },
  {
    path: 'recomendar-restaurantes',
    children: [
      {
        path:"",
        loadChildren: () => import('./restaurantes/recomendar-restaurantes/recomendar-restaurantes.module').then( m => m.RecomendarRestaurantesPageModule)
      },
      {
        path: ":restauranteID",
        loadChildren: () => import('./restaurantes/recomendar-restaurantes/datos-restaurante/datos-restaurante.module').then( m => m.DatosRestaurantePageModule)
      }
    ]  
  },
  {
    path: 'formulario-perso-restaurantes',
    loadChildren: () => import('./restaurantes/formulario-perso-restaurantes/formulario-perso-restaurantes.module').then( m => m.FormularioPersoRestaurantesPageModule)
  },
  {
    path: 'crowd-restaurante',
    loadChildren: () => import('./restaurantes/crowd-restaurante/crowd-restaurante.module').then( m => m.CrowdRestaurantePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}