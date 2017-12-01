import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

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

  private radiostationColl: AngularFirestoreCollection<Radiostation>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFirestore) {
    this.radiostationColl = this.afstore.collection("Radiostations")
  }

  addRadioStation(){
    this.radiostationColl.add({title: this.title,frequency: this.frequency})
    this.navCtrl.pop()
  }

}
