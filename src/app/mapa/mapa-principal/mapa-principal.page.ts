import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Map, tileLayer, marker } from "leaflet";
import * as L from "leaflet";

@Component({
  selector: "app-mapa-principal",
  templateUrl: "./mapa-principal.page.html",
  styleUrls: ["./mapa-principal.page.scss"],
})
export class MapaPrincipalPage implements OnInit {
  map: Map;
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
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(this.map);
    this.map.removeControl(this.map.zoomControl);
    this.map.addControl(L.control.zoom({ position: "bottomright" }));
    
  }
}
