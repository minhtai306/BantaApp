import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AdminradiostationsPage} from "../adminradiostations/adminradiostations";
import {TopicsPage} from "../topics/topics";
import {OptionsPage} from "../options/options";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Radiostation,RadiostationId} from "../../assets/config/interfaces";

/**
 * Generated class for the RadiostationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-radiostations',
  templateUrl: 'radiostations.html',
})
export class RadiostationsPage {

  radiostationColl: AngularFirestoreCollection<Radiostation>;
  radiostations: Observable<RadiostationId[]>


  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFirestore) {
    //get the collection "Radiostations" from firestore
    this.radiostationColl = this.afstore.collection<Radiostation>("Radiostations")
    //retrieve all the documents in the collection including the id
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
    //navigate to topics page with radiostation as parameter
    this.navCtrl.push(TopicsPage,radiostation)
  }

  navToOptions(){
    this.navCtrl.push(OptionsPage)
  }

}
