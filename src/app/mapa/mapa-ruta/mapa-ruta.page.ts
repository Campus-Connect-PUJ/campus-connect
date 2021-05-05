
import { AlertController, NumericValueAccessor } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, LeafletMouseEvent } from "leaflet";

import * as L from "leaflet";
import "leaflet-routing-machine";
import "leaflet.awesome-markers";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import circle  from "@turf/circle";
import { Units } from '@turf/helpers';
import { EventualidadService } from 'src/app/Model/Eventualidad/eventualidad.service';

@Component({
  selector: "app-mapa-ruta",
  templateUrl: "./mapa-ruta.page.html",
  styleUrls: ["./mapa-ruta.page.scss"],
})
export class MapaRutaPage implements OnInit {
  map: Map;

  origen: any;
  destino: any;

  marker_action: any;
  circle_GEO_JSON: any = null;
  latlng_actual: any = null;

  marker_destiny: L.Marker;
  marker_origin: L.Marker;
  geoJSON_layer: L.GeoJSON = null;
  GEO_json_ev: any;

  route_type = "Normal";
  route_shown = false;
  selected_route: any;

  lat_origen = 4.626680783542464;
  lng_origen = -74.06383752822877;

  markers_eventualidades = [];

  private url_route =
    "https://api.openrouteservice.org/v2/directions/foot-walking/geojson";

  private api_key_openrouteservice =
    "5b3ce3597851110001cf6248e267df95fb5a4588990b297f4ef113c8";

  eventualidades: any;
  polygons_eventualidades: any;
  multipolygon: any;

  interval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    private _location: Location,
    public alertController: AlertController,
    private evService: EventualidadService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.destino && params.origen) {
        this.origen = JSON.parse(params.origen);
        this.destino = JSON.parse(params.destino);
        //console.log(this.data);
      }
    });
    this.GEO_json_ev = new Array();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    //console.log("VIEWENTER");
    this.route_type = "Normal";
    this.route_shown = false;
    this.selected_route = true;

    this.leafletMap();

    this.polygons_eventualidades = new Array();
    this.getEventualidades();

    this.normal();
    this.startTrackingLoop();
  }

  startTrackingLoop() {
    this.interval = setInterval(() => {
      //run code
      console.log("Getting new eventualidades");
      this.getNewEventualidades();
    }, 30000);
  }

  stopTrackingLoop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  private getNewEventualidades() {
    var redMarker = L.AwesomeMarkers.icon({
      markerColor: "red",
    });
    this.evService.obtenerEventualidades().subscribe(
      (results) => {
        console.log("New results", results);
        var nuevas_eventualidades = results;
        console.log(nuevas_eventualidades);
        if (nuevas_eventualidades.length != this.eventualidades.length) {
          this.polygons_eventualidades = new Array();

          this.markers_eventualidades.forEach(element => {
            this.map.removeLayer(element);
          });

          this.eventualidades = results;
          this.eventualidades.forEach((element) => {
            var options = {
              steps: 10,
              units: "kilometers" as Units,
              properties: { foo: "bar" },
            };
            var radius = 0.01;
            var center = [element.longitud, element.latitud];
            var circle_var = circle(center, radius, options);
            //this.GEO_json_ev.push(new L.GeoJSON(circle_var).addTo(this.map));
            //console.log("circle", circle_var.geometry.coordinates);
            this.polygons_eventualidades.push(circle_var.geometry.coordinates);

            var marker = L.marker([center[1], center[0]], {
              icon: redMarker,
            }).addTo(this.map);
            var message =
              "<b>" + element.tipo + "</b><br>" + element.descripcion;
            marker.bindPopup(message);
            this.markers_eventualidades.push(marker);
          });
          console.log("Calculando nueva ruta");
          this.multipolygon = {
            type: "MultiPolygon",
            coordinates: this.polygons_eventualidades,
          };
          console.log("Multipolygon", this.multipolygon);
          this.calcularRuta();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private getEventualidades() {
    var redMarker = L.AwesomeMarkers.icon({
      markerColor: "red",
    });
    this.evService.obtenerEventualidades().subscribe(
      (results) => {
        this.polygons_eventualidades = new Array();

        this.markers_eventualidades.forEach((element) => {
          this.map.removeLayer(element);
        });

        console.log("results", results);
        this.eventualidades = results;
        console.log(this.eventualidades);
        this.eventualidades.forEach((element) => {
          var options = {
            steps: 10,
            units: "kilometers" as Units,
            properties: { foo: "bar" },
          };
          var radius = 0.01;
          var center = [element.longitud, element.latitud];
          var circle_var = circle(center, radius, options);
          //this.GEO_json_ev.push(new L.GeoJSON(circle_var).addTo(this.map));
          //console.log("circle", circle_var.geometry.coordinates);
          this.polygons_eventualidades.push(circle_var.geometry.coordinates);

          var marker = L.marker([center[1], center[0]], {
            icon: redMarker,
          }).addTo(this.map);
          var message = "<b>" + element.tipo + "</b><br>" + element.descripcion;
          marker.bindPopup(message);
          this.markers_eventualidades.push(marker);

        });
        this.multipolygon = {
          type: "MultiPolygon",
          coordinates: this.polygons_eventualidades,
        };
        console.log("Multipolygon", this.multipolygon);
        this.calcularRuta();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async leafletMap() {
    this.map = new Map("map_route").setView([4.62877, -74.06363], 16);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      this.map
    );
    this.map.removeControl(this.map.zoomControl);

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
  }

  ionViewWillLeave() {
    console.log("LEAVE");
    if (this.map) {
      this.map.remove();
    }
    this.circle_GEO_JSON = null;
    this.latlng_actual = null;
    this.geoJSON_layer = null;
    this.route_shown = true;
    this.stopTrackingLoop();
  }

  public onBackAction($event) {
    this.router.navigate(["mapa-principal"]);
  }

  public toHome($event) {
    this.router.navigate(["auth-home"]);
  }

  onChange($event) {
    console.log(this.route_shown);
    this.route_shown = !this.route_shown;
    this.calcularRuta();
  }

  private calcularRuta() {
    if (this.route_shown) {
      var { httpOptions, response } = this.evitarEscalones();
      this.route_type = "Evitar escalones";
    } else {
      var { httpOptions, response } = this.normal();
      this.route_type = "Normal";
    }
  }

  private normal() {
    this.route_type = "Normal";
    if (this.geoJSON_layer != null) {
      this.map.removeLayer(this.geoJSON_layer);
    }
    let coordinates;
    if (this.multipolygon != null) {
      coordinates = {
        coordinates: [
          [this.origen.lng, this.origen.lat],
          [this.destino.lng, this.destino.lat],
        ],
        options: {
          avoid_polygons: this.multipolygon,
        },
      };
    } else {
      coordinates = {
        coordinates: [
          [this.origen.lng, this.origen.lat],
          [this.destino.lng, this.destino.lat],
        ],
        options: {
          avoid_polygons: this.multipolygon,
        },
      };
    }
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
        if (this.geoJSON_layer != null) {
          this.map.removeLayer(this.geoJSON_layer);
        }
        this.geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map);
      });
    return { httpOptions, response };
  }

  private evitarEscalones() {
    if (this.geoJSON_layer != null) {
      this.map.removeLayer(this.geoJSON_layer);
    }
    let coordinates;
    if (this.multipolygon != null) {
      coordinates = {
        coordinates: [
          [this.origen.lng, this.origen.lat],
          [this.destino.lng, this.destino.lat],
        ],
        options: {
          avoid_features: ["steps"],
        },
      };
    } else {
      coordinates = {
        coordinates: [
          [this.origen.lng, this.origen.lat],
          [this.destino.lng, this.destino.lat],
        ],
        options: {
          avoid_features: ["steps"],
          avoid_polygons: this.multipolygon,
        },
      };
    }
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
        if (this.geoJSON_layer != null) {
          this.map.removeLayer(this.geoJSON_layer);
        }
        this.geoJSON_layer = new L.GeoJSON(<any>resp).addTo(this.map);
      });
    return { httpOptions, response };
  }

  async eventualidad($event) {
    if (this.latlng_actual == null) {
      let alert = await this.alertController.create({
        cssClass: "custom-class-alert",
        header: "Error",
        subHeader: "Ubicación actual no obtenida",
        message:
          "No se puede reportar una eventualidad sin haber obtenido la ubicación actual",
        buttons: ["OK"],
      });
      await alert.present();
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          destino: JSON.stringify(this.destino),
          origen: JSON.stringify(this.origen),
          actual: JSON.stringify(this.latlng_actual),
        },
      };
      this.router.navigate(["reporte-eventualidades"], navigationExtras);
    }
  }
}
