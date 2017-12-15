import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

/**
 * Generated class for the AdminradiostationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Radiostation { title: string; frequency: string; }

@IonicPage()
@Component({
  selector: 'page-adminradiostations',
  templateUrl: 'adminradiostations.html',
})
export class AdminradiostationsPage {

  private title:string;
  private frequency:string;

  private radiostationColl: AngularFireList<Radiostation>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFireDatabase) {
    this.radiostationColl = this.afstore.list('/radiostations')
    this.frequency = '';
  }

  addRadioStation(){
    this.radiostationColl.push({title: this.title,frequency: this.frequency})
    this.navCtrl.pop()
  }

}
