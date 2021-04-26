import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Map, tileLayer, marker, LeafletMouseEvent } from "leaflet";
import circle from "@turf/circle";

import * as L from "leaflet";
import "leaflet-routing-machine";
import { Lugares_universidad } from 'src/app/services/lugares_universidad';
import { Units } from '@turf/helpers';

@Component({
  selector: "app-mapa-principal",
  templateUrl: "./mapa-principal.page.html",
  styleUrls: ["./mapa-principal.page.scss"],
})
export class MapaPrincipalPage implements OnInit {
  map: Map;

  public markers_onoff = true;

  private marker_selected = null;

  private lugares;

  private markers = new Array();

  lat_origen = 4.626680783542464;
  lng_origen = -74.06383752822877;

  lat_destino = 4.63086992999581;
  lng_destino = -74.06366586685182;

  private url_route =
    "https://api.openrouteservice.org/v2/directions/foot-walking/geojson";

  private api_key_openrouteservice =
    "5b3ce3597851110001cf6248bef69f7785b146a5a300f5cc68db403b";

  marker_action: any = null;
  latlng_actual: any;
  circle_GEO_JSON: any;

  constructor(
    public platform: Platform,
    public router: Router,
    public http: HttpClient,
    public alertController: AlertController
  ) {
    var lugaresUniversidad = new Lugares_universidad();
    this.lugares = lugaresUniversidad.getLugares();
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  ngOnInit() {}

  async leafletMap() {
    this.map = new Map("mapId").setView([4.62877, -74.06363], 17);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      this.map
    );
    this.map.removeControl(this.map.zoomControl);
    // this.map.addControl(L.control.zoom({ position: "bottomright" }));
    var orangeMarker = L.AwesomeMarkers.icon({
      markerColor: "orange",
    });

    this.map.on("click", <LeafletMouseEvent>(clickEvent) => {
      console.log(clickEvent.latlng);
      if (this.marker_action != null) {
        this.map.removeLayer(this.marker_action);
      }
      var marker = L.marker([clickEvent.latlng.lat, clickEvent.latlng.lng], {
        icon: orangeMarker,
      }).addTo(this.map);

      var message =
        "<div>" +
        "Para eliminar el marcador<br>" +
        "seleccionar de nuevo el marcador<br>" +
        "</div>";
      marker.bindPopup(message).on("click", (e) => {
        this.map.removeLayer(this.marker_action)
        this.map.removeLayer(this.circle_GEO_JSON)
        this.marker_action = null
        this.circle_GEO_JSON = null
      }).openPopup();

      this.latlng_actual = {
        lat: clickEvent.latlng.lat,
        lng: clickEvent.latlng.lng,
      };

      this.marker_action = marker;
      var center = [clickEvent.latlng.lng, clickEvent.latlng.lat];
      var radius = 0.01;
      var options = {
        steps: 10,
        units: "kilometers" as Units,
        properties: { foo: "bar" },
      };
      var circle_var = circle(center, radius, options);
      console.log(circle_var);
      if (this.circle_GEO_JSON != null) {
        this.map.removeLayer(this.circle_GEO_JSON);
      }
      this.circle_GEO_JSON = new L.GeoJSON(circle_var).addTo(this.map);
    });

    this.lugares.forEach((element) => {
      var marker = L.marker([element.lat, element.lng]).addTo(this.map);
      var message = "<b>" + element.id + "</b><br>" + element.name + "<br>";
      marker.bindPopup(message).addEventListener("click", (e) => {
        console.log(element);
        this.marker_selected = element;
      });
      this.markers.push(marker);
    });
  }

  change_markers($event) {
    //this.markers_onoff = !this.markers_onoff;
    console.log(this.markers_onoff);
    if (this.markers_onoff == true) {
      //Show Markers
      if (this.markers.length == 0) {
        console.log("SHOW");
        this.lugares.forEach((element) => {
          var marker = L.marker([element.lat, element.lng]).addTo(this.map);
          var message = "<br>" + element.id + "</br><br>" + element.name;
          marker.bindPopup(message);
          this.markers.push(marker);
        });
      }
    } else {
      //Remove Markers
      if (this.markers.length != 0) {
        console.log("REMOVE");
        this.markers.forEach((element) => {
          this.map.removeLayer(element);
        });
        this.markers = new Array();
      }
    }
  }

  toNextPage() {
    this.router.navigate(["lista-sitios"]);
  }

  ionViewWillLeave() {
    if (this.map) {
      this.map.remove();
    }
    this.marker_selected = null;
    this.marker_action = null
  }

  async toNavigation() {
    if (this.marker_selected == null) {
      let alert = await this.alertController.create({
        cssClass: "custom-class-alert",
        header: "Error",
        subHeader: "Marcador no seleccionado",
        message:
          "Para continuar a la generación de la ruta debes seleccionar un marcador antes.",
        buttons: ["OK"],
      });
      await alert.present();
    } else {
      console.log(this.marker_selected);
      var navigationExtras: NavigationExtras;
      if(this.marker_action == null){
        let alert = await this.alertController.create({
          cssClass: "custom-class-alert",
          header: "Información",
          subHeader: "Ubicación actual",
          message:
            "La ruta se generará desde su ubicación actual",
          buttons: ["OK"],
        });
        await alert.present();
        navigationExtras = {
          queryParams: {
            destino: JSON.stringify(this.marker_selected),
            origen: JSON.stringify(this.lugares[15]),
          },
        };
      }else{
        let alert = await this.alertController.create({
          cssClass: "custom-class-alert",
          header: "Información",
          subHeader: "Ubicación seleccionada",
          message: "La ruta se generará desde la ubicación seleccionada",
          buttons: ["OK"],
        });
        await alert.present();
        var element = {
          id: 0,
          name: "Ubicación seleccionada",
          lat: this.latlng_actual.lat,
          lng: this.latlng_actual.lng,
        };
          navigationExtras = {
            queryParams: {
              destino: JSON.stringify(this.marker_selected),
              origen: JSON.stringify(element),
            },
          };
      }
      
      this.router.navigate(["mapa-ruta"], navigationExtras);
    }
  }

  onBackAction() {
    this.router.navigate(["auth-home"]);
  }
}

