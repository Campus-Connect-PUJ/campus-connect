import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, LeafletMouseEvent } from "leaflet";

import * as L from "leaflet";
import "leaflet-routing-machine";

@Component({
  selector: "app-mapa-ruta",
  templateUrl: "./mapa-ruta.page.html",
  styleUrls: ["./mapa-ruta.page.scss"],
})
export class MapaRutaPage implements OnInit {
  map: Map;

  constructor() {}

  ngOnInit() {}
  
  ionViewDidEnter() {
    this.leafletMap();
  }

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
  }
}
