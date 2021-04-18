import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
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

  public markers_onoff = true;

  private marker_selected = null;

  private lugares = [
    {
      id: 1,
      name: "Casa Navarro",
      lat: 4.626619779049803,
      lng: -74.06539320945741,
    },
    {
      id: 2,
      name: "Ed. Fernando Barón S.J",
      lat: 4.626683956795648,
      lng: -74.06382679939271,
    },
    {
      id: 3,
      name: "Ed. Gabriel Giraldo S.J",
      lat: 4.6266676949912915,
      lng: -74.06480312347414,
    },
    //{ name: "Auditorio Luis Carlos Galán", lat: 4.6266676949912915, lng: -74.06480312347414 },
    {
      id: 4,
      name: "Ed. Gerardo Arango Puertas S.J",
      lat: 4.62655548536825,
      lng: -74.06432569026948,
    },
    {
      id: 7,
      name: "Ed. Lorenzo Uribe S.J",
      lat: 4.6298523035430215,
      lng: -74.06500160694124,
    },
    {
      id: 8,
      name: "Ed. Ático",
      lat: 4.626913784506864,
      lng: -74.06511425971986,
    },
    {
      id: 9,
      name: "Ed. Julio Carrizosa",
      lat: 4.627229039909678,
      lng: -74.06451344490053,
    },
    {
      id: 11,
      name: "Ed. José Gabriel Maldonado",
      lat: 4.626972560948542,
      lng: -74.06415402889253,
    },
    {
      id: 11,
      name: "Ed. José Gabriel Maldonado Laboratorios",
      lat: 4.627191636733629,
      lng: -74.06393408775331,
    },
    {
      id: 20,
      name: "Ed. Jorge Hoyos Vásquez S.J",
      lat: 4.627538951863723,
      lng: -74.0651035308838,
    },
    {
      id: 21,
      name: "Ed. Emilio Arango S.J",
      lat: 4.628532806525248,
      lng: -74.06485676765443,
    },
    {
      id: 23,
      name: "Cafeteria Central",
      lat: 4.628244268218894,
      lng: -74.06473338603975,
    },
    {
      id: 24,
      name: "Hospital Universitario San Ignacio",
      lat: 4.628409342181997,
      lng: -74.06407205219945,
    },
    {
      id: 26,
      name: "Facultad de Odontología",
      lat: 4.628088659606039,
      lng: -74.06392815498037,
    },
    {
      id: 27,
      name: "Ed. José del Carmén Acosta",
      lat: 4.628222344076499,
      lng: -74.06369177801697,
    },
    {
      id: 29,
      name: "Urgencias HUSI",
      lat: 4.628714302710407,
      lng: -74.06403559905463,
    },
    {
      id: 31,
      name: "Ed. Rafael Barrientos Conto - Morfología",
      lat: 4.628543186702638,
      lng: -74.06340167901645,
    },
    {
      id: 32,
      name: "Instituto de Genética Humana",
      lat: 4.628767776454364,
      lng: -74.06317067425677,
    },
    {
      id: 41,
      name: "Edificio Pablo Sexto",
      lat: 4.629687524217828,
      lng: -74.06408932109177,
    },
    {
      id: 43,
      name: "Edificio Catalán",
      lat: 4.629960239894621,
      lng: -74.06351449529443,
    },
    {
      id: 50,
      name: "Ed. Félix Restrepo S.J",
      lat: 4.630842554599325,
      lng: -74.06408394888807,
    },
    {
      id: 51,
      name: "Ed. Ángel Valtierra S.J",
      lat: 4.630746302139555,
      lng: -74.06389592175809,
    },
    {
      id: 52,
      name: "Ed. Carlos Ortiz S.J",
      lat: 4.630821165164939,
      lng: -74.06370252242439,
    },
    {
      id: 53,
      name: "Ed. Jesús Emilio Ramirez S.J",
      lat: 4.630682133825774,
      lng: -74.06350912309072,
    },
    {
      id: 54,
      name: "Ed. Jesús Emilio Ramirez S.J",
      lat: 4.630682133825774,
      lng: -74.06350912309072,
    },
    {
      id: 55,
      name: "Ed. Unidad de Biología Comparativa",
      lat: 4.630767691576193,
      lng: -74.06320290747907,
    },
    {
      id: 67,
      name: "Ed. José Rafael Arboleda S.J",
      lat: 4.628671541351682,
      lng: -74.06280503740554,
    },
    {
      id: 90,
      name: "Cancha de Fútbol",
      lat: 4.627206403431518,
      lng: -74.063192645784,
    },
    {
      id: 91,
      name: "Centro Javeriano de Formación Deportiva",
      lat: 4.627051329220854,
      lng: -74.0625479813384,
    },
    {
      id: 93,
      name: "Canchas Múltiples y Zona Deportiva",
      lat: 4.626719865767336,
      lng: -74.06208138596938,
    },
    {
      id: 94,
      name: "Ed. Pedro Arrupe S.J",
      lat: 4.626259990106885,
      lng: -74.06315045450835,
    },
    {
      id: 95,
      name: "Ed. Manuel Briceño Jáuregui S.J",
      lat: 4.626270684893076,
      lng: -74.06256488430358,
    },
    {
      id: 115,
      name: "Ed. Don Guillermo Castro",
      lat: 4.627912228178977,
      lng: -74.06304715249979,
    },
  ];

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
    public alertController: AlertController
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
    this.marker_selected = null
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
          special: JSON.stringify(this.marker_selected),
        },
      };
      this.router.navigate(["mapa-ruta"], navigationExtras);
    }
  }
}