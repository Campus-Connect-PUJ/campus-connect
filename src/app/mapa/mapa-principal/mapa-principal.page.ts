import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Map, tileLayer, marker, LeafletMouseEvent } from "leaflet";

import * as L from "leaflet";
import "leaflet-routing-machine";
import { Lugares_universidad } from 'src/app/services/lugares_universidad';

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

  constructor(
    public platform: Platform,
    public router: Router,
    public http: HttpClient,
    public alertController: AlertController,
  ) {
    var lugaresUniversidad = new Lugares_universidad();
    this.lugares = lugaresUniversidad.getLugares()
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
    this.map.on("click", <LeafletMouseEvent>(clickEvent) => {
      console.log(clickEvent.latlng);
    });

    // let coordinates = {
    //   coordinates: [
    //     [this.lng_origen, this.lat_origen],
    //     [this.lng_destino, this.lat_destino],
    //   ],
    // };
    // const body = JSON.stringify(coordinates);

    // var httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept:
    //       "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
    //     "Content-Type": "application/json",
    //     Authorization: this.api_key_openrouteservice,
    //   }),
    // };
    this.lugares.forEach((element) => {
      var marker = L.marker([element.lat, element.lng]).addTo(this.map);
      var message = "<b>" + element.id + "</b><br>" + element.name + "<br>";
      marker.bindPopup(message).addEventListener("click", (e) => {
        console.log(element);
        this.marker_selected = element;
      });
      this.markers.push(marker);
    });

    // var response = this.http
    //   .post(this.url_route, body, httpOptions)
    //   .subscribe((resp) => {
    //     console.log(resp);
    //     var geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map)
    //   })
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
      let navigationExtras: NavigationExtras = {
        queryParams: {
          destino: JSON.stringify(this.marker_selected),
          origen: JSON.stringify(this.lugares[15]),
        },
      };
      this.router.navigate(["mapa-ruta"], navigationExtras);
    }
  }
}