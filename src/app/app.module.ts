import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GruposEstudiantilesComponent } from './components/grupos-estudiantiles/grupos-estudiantiles.component';
import { PipesModule } from './pipes/pipes.module';
import { IonicStorageModule } from '@ionic/storage';

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
    IonicStorageModule.forRoot()
    //RecoGruposPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
