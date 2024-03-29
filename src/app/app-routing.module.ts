import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GruposEstudiantilesComponent } from './components/grupos-estudiantiles/grupos-estudiantiles.component';

const routes: Routes = [
  { 
    path: "grupos_estudiantiles", component: GruposEstudiantilesComponent 
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "calculadora",
    loadChildren: () =>
      import("./calculadora/calculadora.module").then(
        (m) => m.CalculadoraPageModule
      ),
  },
  {
    path: "reco-grupos",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./grupos-estudiantiles/reco-grupos/reco-grupos.module").then(
            (m) => m.RecoGruposPageModule
          ),
      },
      {
        path: ":grupoID",
        loadChildren: () =>
          import(
            "./grupos-estudiantiles/reco-grupos/datos-grupo/datos-grupo.module"
          ).then((m) => m.DatosGrupoPageModule),
      },
    ],
  },
  {
    path: "formulario-perso-grupos",
    loadChildren: () =>
      import(
        "./grupos-estudiantiles/formulario-perso-grupos/formulario-perso-grupos.module"
      ).then((m) => m.FormularioPersoGruposPageModule),
  },
  {
    path: "registro",
    loadChildren: () =>
      import("./auth/registro/registro.module").then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "auth-home",
    loadChildren: () =>
      import("./home/auth-home/auth-home.module").then(
        (m) => m.AuthHomePageModule
      ),
  },
  {
    path: "formulario-perso-grupos",
    loadChildren: () =>
      import(
        "./grupos-estudiantiles/formulario-perso-grupos/formulario-perso-grupos.module"
      ).then((m) => m.FormularioPersoGruposPageModule),
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
        path: "exigencia/:exig",
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
    children:[
      {
        path: "",
        loadChildren: () => import('./foros/foros.module').then(m => m.ForosPageModule)
      },
      {
        path: ":foroId",
        loadChildren: () => import('./foros/foro-detalles/foro-detalles.module').then(m => m.ForoDetallesPageModule)
      }
    ]
  },
  {
    path: 'recomendar-restaurantes',
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "./restaurantes/recomendar-restaurantes/recomendar-restaurantes.module"
          ).then((m) => m.RecomendarRestaurantesPageModule),
      },
      {
        path: ":restauranteID",
        loadChildren: () =>
          import(
            "./restaurantes/recomendar-restaurantes/datos-restaurante/datos-restaurante.module"
          ).then((m) => m.DatosRestaurantePageModule),
      },
    ],
  },
  {
    path: "formulario-perso-restaurantes",
    loadChildren: () =>
      import(
        "./restaurantes/formulario-perso-restaurantes/formulario-perso-restaurantes.module"
      ).then((m) => m.FormularioPersoRestaurantesPageModule),
  },
  {
    path: "sugerencias-principal",
    loadChildren: () =>
      import("./sugerencias-principal/sugerencias-principal.module").then(
        (m) => m.SugerenciasPrincipalPageModule
      ),
  },
  {
    path: "crowd-restaurante",
    loadChildren: () =>
      import("./restaurantes/crowd-restaurante/crowd-restaurante.module").then(
        (m) => m.CrowdRestaurantePageModule
      ),
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./perfil/perfil/perfil.module").then((m) => m.PerfilPageModule),
  },
  {
    path: "formulario_registro",
    loadChildren: () =>
      import("./auth/formulario/formulario.module").then(
        (m) => m.FormularioPageModule
      ),
  },
  {
    path: "formulario_registro2",
    loadChildren: () =>
      import("./auth/formulario2/formulario2.module").then(
        (m) => m.Formulario2PageModule
      ),
  },
  {
    path: "mapa-principal",
    loadChildren: () =>
      import("./mapa/mapa-principal/mapa-principal.module").then(
        (m) => m.MapaPrincipalPageModule
      ),
  },
  {
    path: 'datos-restaurante',
    loadChildren: () => import('./restaurantes/recomendar-restaurantes/datos-restaurante/datos-restaurante.module').then( m => m.DatosRestaurantePageModule)
  },
  {
    path: 'sugerencias-principal',
    loadChildren: () => import('./sugerencias-principal/sugerencias-principal.module').then( m => m.SugerenciasPrincipalPageModule)
  },
  {
    path: 'crowd-restaurante',
    loadChildren: () => import('./restaurantes/crowd-restaurante/crowd-restaurante.module').then( m => m.CrowdRestaurantePageModule)
  },
  {
    path: 'monitores',
    loadChildren: () => import('./monitores/monitores.module').then( m => m.MonitoresPageModule)
  },
  {
    path: 'foro-crear',
    loadChildren: () => import('./foros/foro-crear/foro-crear.module').then( m => m.ForoCrearPageModule)
  },
  {
    path: 'tip-crear',
    loadChildren: () => import('./tips/tip-crear/tip-crear.module').then( m => m.TipCrearPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioPageModule)
  },
  {
    path: 'contribuciones',
    loadChildren: () => import('./contribuciones/contribuciones.module').then( m => m.ContribucionesPageModule)
  },
  {
    path: 'agregar-tipo-aprendizaje',
    loadChildren: () => import('./recomendacion-tip/agregar-tipo-aprendizaje/agregar-tipo-aprendizaje.module').then( m => m.AgregarTipoAprendizajePageModule)
  },
  {
    path: 'mapa-ruta',
    loadChildren: () => import('./mapa/mapa-ruta/mapa-ruta.module').then( m => m.MapaRutaPageModule)
  },
  {
    path: 'lista-sitios',
    loadChildren: () => import('./mapa/lista-sitios/lista-sitios.module').then( m => m.ListaSitiosPageModule)
  },
  {
    path: 'contribuciones',
    loadChildren: () => import('./contribuciones/contribuciones.module').then( m => m.ContribucionesPageModule)
  },
  {
    path: 'lista-sitios-destino',
    loadChildren: () => import('./mapa/lista-sitios-destino/lista-sitios-destino.module').then( m => m.ListaSitiosDestinoPageModule)
  },
  {
    path: 'reporte-eventualidades',
    loadChildren: () => import('./mapa/reporte-eventualidades/reporte-eventualidades.module').then( m => m.ReporteEventualidadesPageModule)
  },
  {
    path: 'reporte-eventualidades-principal',
    loadChildren: () => import('./mapa/reporte-eventualidades-principal/reporte-eventualidades-principal.module').then( m => m.ReporteEventualidadesPrincipalPageModule)
  },
  {
    path: 'suge-grupos',
    loadChildren: () => import('./grupos-estudiantiles/suge-grupos/suge-grupos.module').then( m => m.SugeGruposPageModule)
  },
  {
    path: 'suge-restaurantes',
    loadChildren: () => import('./restaurantes/suge-restaurantes/suge-restaurantes.module').then( m => m.SugeRestaurantesPageModule)
  },
  {
    path: 'contribuciones',
    loadChildren: () => import('./contribuciones/contribuciones.module').then( m => m.ContribucionesPageModule)
  },
  {
    path: 'test-aprendizaje',
    loadChildren: () => import('./test-aprendizaje/test-aprendizaje.module').then( m => m.TestAprendizajePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
