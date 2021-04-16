import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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

  lat_destino= 4.63086992999581;
  lng_destino= -74.06366586685182;

  constructor(public platform: Platform, public router: Router) {
    this.platform.ready().then(() => {
      //this.leafletMap();
    });
  }

  // The below function is added
  ionViewDidEnter() {
    this.leafletMap();
  }

  ngOnInit() {}

  leafletMap() {
    this.map = new Map("mapId").setView([4.62877, -74.06363], 17);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      this.map
    );
    this.map.removeControl(this.map.zoomControl);
    // this.map.addControl(L.control.zoom({ position: "bottomright" }));
    this.map.on("click", <LeafletMouseEvent>(clickEvent) => {
      console.log(clickEvent.latlng);
    });

    L.Routing.control({
      waypoints: [
        L.latLng(this.lat_origen, this.lng_origen),
        L.latLng(this.lat_destino, this.lng_destino),
      ],
      routeWhileDragging: true,
    }).addTo(this.map);
  }
}