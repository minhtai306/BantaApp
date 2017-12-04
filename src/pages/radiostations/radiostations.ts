import { Component } from '@angular/core';
import {IonicPage, Item, NavController, NavParams} from 'ionic-angular';
import {AdminradiostationsPage} from "../adminradiostations/adminradiostations";
import {TopicsPage} from "../topics/topics";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the RadiostationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Radiostation { title: string; frequency: string; }
export interface RadiostationId extends Radiostation { id: string; }

@IonicPage()
@Component({
  selector: 'page-radiostations',
  templateUrl: 'radiostations.html',
})
export class RadiostationsPage {

  radiostationColl: AngularFirestoreCollection<Radiostation>;
  radiostations: Observable<RadiostationId[]>


  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFirestore) {
    this.radiostationColl = this.afstore.collection<Radiostation>("Radiostations")
    this.radiostations = this.radiostationColl.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Radiostation;
          const id = a.payload.doc.id;
          return {id,...data}
        })
      });
  }

  navToTopics(radiostation:Radiostation){
    this.navCtrl.push(TopicsPage,radiostation)
  }

  navToAddRadioStation(){
    this.navCtrl.push(AdminradiostationsPage)
  }

}
