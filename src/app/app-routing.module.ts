import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GruposEstudiantilesComponent } from './components/grupos-estudiantiles/grupos-estudiantiles.component';

const routes: Routes = [
  { path: 'grupos_estudiantiles', component: GruposEstudiantilesComponent },
  {
    path: '',
    //redirectTo: 'tabs/tab1',
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
    loadChildren: () => import('./grupos-estudiantiles/reco-grupos/reco-grupos.module').then( m => m.RecoGruposPageModule)
  },
  {
    path: 'datos-grupo',
    loadChildren: () => import('./grupos-estudiantiles/reco-grupos/datos-grupo/datos-grupo.module').then( m => m.DatosGrupoPageModule)
  },
  {
    path: 'formulario-perso-grupos',
    loadChildren: () => import('./grupos-estudiantiles/formulario-perso-grupos/formulario-perso-grupos.module').then( m => m.FormularioPersoGruposPageModule)
  },
  {
    path: 'servicios-academicos',
    loadChildren: () => import('./servicios-academicos/servicios-academicos.module').then( m => m.ServiciosAcademicosPageModule)
  },
  {
    path: 'recomendacion-tip',
    loadChildren: () => import('./recomendacion-tip/recomendacion-tip.module').then(m => m.RecomendacionTipPageModule)
  },
  {
    path: 'tips',
    children:[
      {
        path: "",
        loadChildren: () => import('./tips/tips.module').then(m => m.TipsPageModule)
      },
      {
        path: ":tipId",
        loadChildren: () => import('./tips/tip-detalles/tip-detalles.module').then(m => m.TipDetallesPageModule)
      }
    ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'foros',
    loadChildren: () => import('./foros/foros.module').then(m => m.ForosPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}