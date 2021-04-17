import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Map, tileLayer, marker, LeafletMouseEvent } from "leaflet";

import * as L from "leaflet";
import "leaflet-routing-machine";

@Component({
  selector: "app-mapa-principal",
  templateUrl: "./mapa-principal.page.html",
  styleUrls: ["./mapa-principal.page.scss"],
})
export class MapaPrincipalPage implements OnInit {
  map: Map;

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
    public http: HttpClient
  ) {}

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

    let coordinates = {
      coordinates: [
        [this.lng_origen, this.lat_origen],
        [this.lng_destino, this.lat_destino],
      ],
    };
    const body = JSON.stringify(coordinates);

    var httpOptions = {
      headers: new HttpHeaders({ 
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        "Content-Type": "application/json",
        "Authorization": this.api_key_openrouteservice
      }),
    };

    var response = this.http
      .post(this.url_route, body, httpOptions)
      .subscribe((resp) => {
        console.log(resp);
        var geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map)
      })
  }
}