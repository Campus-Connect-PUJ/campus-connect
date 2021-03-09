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
    path: 'recomendacion-tip',
    loadChildren: () => import('./recomendacion-tip/recomendacion-tip.module').then( m => m.RecomendacionTipPageModule)
  },
  {
    path: 'tips',
    children: [
      {
        path: "",
        loadChildren: () => import('./tips/tips.module').then( m => m.TipsPageModule)
      },
      {
        path: ":tipId",
        loadChildren: () => import('./tips/tip-detalles/tip-detalles.module').then(m => m.TipDetallesPageModule)
      }
    ]
    
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
