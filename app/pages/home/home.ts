import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Geolocation} from 'ionic-native';

declare var google; 

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  @ViewChild('map') mapElement:ElementRef; 
  map:any; 
  mapInitialized:boolean = false; 
  apiKey: any; 

  showMap:boolean = true;

  constructor(private navCtrl: NavController) {
    this.loadGoogleMaps();
  }

  changeView(){
    this.showMap = !this.showMap;
  }

  loadGoogleMaps(){

  }

}
