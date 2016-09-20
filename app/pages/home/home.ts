import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';

declare var google; 

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; 
  map: any; 
  mapInitialized: boolean = false; 
  apiKey: any = 'AIzaSyB_MpqeZ9goeJptRq_6PI4wzVJmsQSai2U';

  showMap: boolean = true;

  constructor(private navCtrl: NavController, private connectivityService: ConnectivityService) {
    this.loadGoogleMaps();
  }

  changeView() {
    this.showMap = !this.showMap;
    console.log('Mudou');
    console.log(this.showMap);
  }

  loadGoogleMaps() {
    this.addConnectivityListeners();

    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.log('GoogleMaps javascript needs to be loaded');
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log('online, loading map');       

        // Load SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        };

        let script = document.createElement('script');
        script.id = 'googleMaps';

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';          
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);
      }
    } else {
      if (this.connectivityService.isOnline) {
        console.log('showing map');
        this.initMap();
        this.enableMap();
      } else {
        console.log('disabling map');
        this.disableMap();
      }
    }
  }

  initMap() {
    this.mapInitialized = true;

    Geolocation.getCurrentPosition().then(position => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);      

      let mapOptions = {
        center: latLng, 
        zoom: 15, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log("PASSEI AQUI");
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    });

  }

  disableMap() {
    console.log('disable Map');
  }

  enableMap() {
    console.log('enable Map'); 
  }

  addConnectivityListeners() {
    var me = this; 

    var onOnline = () => {
      setTimeout(() => {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
          this.loadGoogleMaps();
        }else {
          if (!this.mapInitialized) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    };

    var onOffline = () => {
      this.disableMap(); 
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
  }



}
