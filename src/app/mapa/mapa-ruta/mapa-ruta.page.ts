import { NumericValueAccessor } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, LeafletMouseEvent } from "leaflet";

import * as L from "leaflet";
import "leaflet-routing-machine";
import "leaflet.awesome-markers";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: "app-mapa-ruta",
  templateUrl: "./mapa-ruta.page.html",
  styleUrls: ["./mapa-ruta.page.scss"],
})
export class MapaRutaPage implements OnInit {
  map: Map;

  origen: any;
  destino: any;

  marker_destiny: L.Marker;
  marker_origin: L.Marker;
  geoJSON_layer: L.GeoJSON = null;

  route_type = "Normal"
  route_selected = true;

  lat_origen = 4.626680783542464;
  lng_origen = -74.06383752822877;

  private url_route =
    "https://api.openrouteservice.org/v2/directions/foot-walking/geojson";

  private api_key_openrouteservice =
    "5b3ce3597851110001cf6248bef69f7785b146a5a300f5cc68db403b";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    private _location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.destino && params.origen) {
        this.origen = JSON.parse(params.origen);
        this.destino = JSON.parse(params.destino);
        //console.log(this.data);
      }
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.leafletMap();
  }

  async leafletMap() {
    this.map = new Map("map_route").setView([4.62877, -74.06363], 16);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      this.map
    );
    this.map.removeControl(this.map.zoomControl);

    var redMarker = L.AwesomeMarkers.icon({
      markerColor: "red",
    });

    var marker = L.marker([this.destino.lat, this.destino.lng], {
      icon: redMarker,
    }).addTo(this.map);
    var message = "<b>" + this.destino.id + "</b><br>" + this.destino.name;
    marker.bindPopup(message);
    this.marker_destiny = marker;

    var greenMarker = L.AwesomeMarkers.icon({
      markerColor: "green",
    });

    var marker_origin = L.marker([this.origen.lat, this.origen.lng], {
      icon: greenMarker,
    }).addTo(this.map);
    var message_origin = "<b>" + "Estás aquí." + "</b>";
    var popup_marker = L.popup({
      autoClose: false,
      closeOnClick: false,
    }).setContent(message_origin);
    marker_origin.bindPopup(popup_marker).openPopup();
    this.marker_origin = marker_origin;

    let coordinates = {
      coordinates: [
        [this.origen.lng, this.origen.lat],
        [this.destino.lng, this.destino.lat],
      ],
    };
    const body = JSON.stringify(coordinates);

    var httpOptions = {
      headers: new HttpHeaders({
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        "Content-Type": "application/json",
        Authorization: this.api_key_openrouteservice,
      }),
    };

    var response = this.http
      .post(this.url_route, body, httpOptions)
      .subscribe((resp) => {
        console.log(resp);
        this.geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map);
      });
  }

  ionViewWillLeave() {
    if (this.map) {
      this.map.remove();
    }
  }

  public onBackAction($event) {
    this._location.back();
  }

  public toHome($event) {
    this.router.navigate(["auth-home"]);
  }

  onChange($event){
    console.log(this.route_selected)
    if(this.route_selected){
      this.route_type = "Evitar escalones";
      if(this.geoJSON_layer != null){
        this.map.removeLayer(this.geoJSON_layer)
      }

      let coordinates = {
        coordinates: [
          [this.origen.lng, this.origen.lat],
          [this.destino.lng, this.destino.lat],
        ],
        options: { avoid_features: ["steps"] },
      };
      const body = JSON.stringify(coordinates);

      var httpOptions = {
        headers: new HttpHeaders({
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          "Content-Type": "application/json",
          Authorization: this.api_key_openrouteservice,
        }),
      };

      var response = this.http
        .post(this.url_route, body, httpOptions)
        .subscribe((resp) => {
          console.log(resp);
          this.geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map);
        });
    }else{
      this.route_type = "Normal";
      if (this.geoJSON_layer != null) {
        this.map.removeLayer(this.geoJSON_layer);
      }
      let coordinates = {
        coordinates: [
          [this.origen.lng, this.origen.lat],
          [this.destino.lng, this.destino.lat],
        ],
      };
      const body = JSON.stringify(coordinates);

      var httpOptions = {
        headers: new HttpHeaders({
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          "Content-Type": "application/json",
          Authorization: this.api_key_openrouteservice,
        }),
      };

      var response = this.http
        .post(this.url_route, body, httpOptions)
        .subscribe((resp) => {
          console.log(resp);
          this.geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map);
        });
    }
  }
}
