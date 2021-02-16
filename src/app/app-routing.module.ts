import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'recomendar-restaurantes',
    loadChildren: () => import('./recomendar-restaurantes/recomendar-restaurantes.module').then( m => m.RecomendarRestaurantesPageModule)
  },
  {
    path: 'formulario-perso-restaurantes',
    loadChildren: () => import('./formulario-perso-restaurantes/formulario-perso-restaurantes.module').then( m => m.FormularioPersoRestaurantesPageModule)
  },
  {
    path: 'datos-restaurante',
    loadChildren: () => import('./datos-restaurante/datos-restaurante.module').then( m => m.DatosRestaurantePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
