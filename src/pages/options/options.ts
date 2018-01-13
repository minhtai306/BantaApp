import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AdminradiostationsPage} from "../adminradiostations/adminradiostations";
import {UserprofilePage} from "../userprofile/userprofile";

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private afauth:AngularFireAuth) {
  }

  signOut(){
    this.afauth.auth.signOut()
    this.navCtrl.popToRoot()
  }

  navToAddRadioStation(){
    //navigate to the administration to add new radiostation
    this.navCtrl.push(AdminradiostationsPage)
  }

  navtoUserProfile(){
    this.navCtrl.push(UserprofilePage,{uid:this.afauth.auth.currentUser.uid})
  }
}
