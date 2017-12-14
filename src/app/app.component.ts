import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { VerificationPage } from '../pages/verification/verification';
import {RadiostationProvider} from "../providers/radiostation/radiostation";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  radiostation:RadiostationProvider

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,radiostation:RadiostationProvider) {
    this.radiostation = radiostation
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
