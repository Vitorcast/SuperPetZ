import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var Connection; 

@Injectable()
export class ConnectivityService {

  onDevice: boolean; 

  constructor(private http: Http, public platform: Platform) {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if (this.onDevice && Network.connection) {
      return Network.connection !== Connection.NONE; 
    } else {
      return navigator.onLine;
    }    
  }

  isOffLine(): boolean {
    if (this.onDevice && Network.connection) {
      return Network.connection === Connection.NONE; 
    } else {
      return !navigator.onLine;
    }    
  }

}

