import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OptionsPage} from "../options/options";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Radiostation,RadiostationId} from "../../assets/config/interfaces";
import {TextsPage} from "../texts/texts";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {RadiostationProvider} from "../../providers/radiostation/radiostation";

/**
 * Generated class for the RadiostationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-radiostations',
  templateUrl: 'radiostations.html'

})
export class RadiostationsPage {

  private radiostationColl: AngularFireList<Radiostation>;
  private radiostations: Observable<RadiostationId[]>
  private searchString:string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afstore:AngularFireDatabase,
    private rdProvider:RadiostationProvider
  ) {
    this.searchString = '';
    this.radiostationColl = this.afstore.list('/radiostations')
    //retrieve all the documents in the collection including the id
    this.radiostations = this.radiostationColl.snapshotChanges()
      .map(radiostation=>{
        return radiostation.map(r=>({key:r.payload.key,...r.payload.val()}))
      });
  }


  navToTopics(radiostation:RadiostationId){
    //navigate to topics page with radiostation as parameter
    this.rdProvider.setRadioStation(radiostation)
    this.navCtrl.push(TextsPage,radiostation)
  }

  navToOptions(){
    this.navCtrl.push(OptionsPage)
  }

  search(ev){
    this.searchString = ev.target.value;
  }

}
