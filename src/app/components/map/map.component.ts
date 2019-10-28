import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map', null) map;

  constructor() { }

  ngOnInit(): void {
    const latLng: string[] = this.coords.split(',');
    const lat   : number = Number(latLng[0]);
    const lng   : number = Number(latLng[1]);

    mapboxgl.accessToken = environment.tokenMap;
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style    : 'mapbox://styles/mapbox/streets-v11',
      center   : [lng, lat],
      zoom     : 15
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }

}
