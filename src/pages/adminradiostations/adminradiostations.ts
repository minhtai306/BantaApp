import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {PopupProvider} from "../../providers/popup/popup";
import {FCM} from "@ionic-native/fcm";
import {Radiostation} from "../../assets/config/interfaces";

/**
 * Generated class for the AdminradiostationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminradiostations',
  templateUrl: 'adminradiostations.html',
})
export class AdminradiostationsPage {

  private title:string;
  private frequency:string;
  private password:string;
  private phoneNumber:string

  private static passwordCheck:string = "iamageofbanta13"

  private radiostationColl: AngularFireList<Radiostation>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afstore:AngularFireDatabase,
              private popUp:PopupProvider) {
  }

  ionViewDidLoad(){
    this.radiostationColl = this.afstore.list('/radiostations')
    this.frequency = '';
    this.password = '';
    this.phoneNumber = null
  }

  addRadioStation(){
    if(this.password != AdminradiostationsPage.passwordCheck){
      this.popUp.openPopUp("Error","ivalid password")
    }
    else if(this.phoneNumber == null) {
      this.popUp.openPopUp("Error", "Radiostation requires phone number")
    }
    else {
      this.radiostationColl.push({title: this.title, frequency: this.frequency,phoneNumber:this.phoneNumber})
      this.navCtrl.pop()
    }
  }

}
