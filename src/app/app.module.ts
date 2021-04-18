import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GruposEstudiantilesComponent } from './components/grupos-estudiantiles/grupos-estudiantiles.component';
import { PipesModule } from './pipes/pipes.module';

import { environment } from 'src/environments/environment';
import { FormularioPersoRestaurantesPageModule } from './restaurantes/formulario-perso-restaurantes/formulario-perso-restaurantes.module';

import { IonicStorageModule } from '@ionic/storage';
import { FormularioPersoGruposPageModule } from './grupos-estudiantiles/formulario-perso-grupos/formulario-perso-grupos.module';
import { AuthInterceptor } from './services/auth-interceptor';

//import { RecoGruposPage } from './grupos-estudiantiles/reco-grupos/reco-grupos.page';
//import { DatosGrupoPage } from './grupos-estudiantiles/datos-grupo/datos-grupo.page';

@NgModule({
  declarations: [
    AppComponent,
    GruposEstudiantilesComponent
  ],
  entryComponents: [
    //RecoGruposPage,
    //DatosGrupoPage
  ],
  imports: [
    PipesModule,
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormularioPersoRestaurantesPageModule,
    FormularioPersoGruposPageModule,
    IonicStorageModule.forRoot()
    //RecoGruposPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
