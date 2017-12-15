import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OptionsPage} from "../options/options";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Radiostation,RadiostationId} from "../../assets/config/interfaces";
import {TextsPage} from "../texts/texts";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {SearchPipe} from "../../pipes/search/search";

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

  radiostationColl: AngularFireList<Radiostation>;
  radiostations: Observable<RadiostationId[]>
  radiostationsFilter: Observable<RadiostationId[]>

  private searchString:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFireDatabase) {
    //initialise search value to empty string
    this.searchString = '';
    //get the collection "Radiostations" from firestore
    this.radiostationColl = this.afstore.list('/radiostations')
    //retrieve all the documents in the collection including the id
    this.radiostations = this.radiostationColl.snapshotChanges()
      .map(radiostation=>{
        return radiostation.map(r=>({key:r.payload.key,...r.payload.val()}))
      });
    this.radiostationsFilter = this.radiostations
  }

  navToTopics(radiostation:Radiostation){
    //navigate to topics page with radiostation as parameter
    this.navCtrl.push(TextsPage,radiostation)
  }

  navToOptions(){
    this.navCtrl.push(OptionsPage)
  }

  search(ev){
    this.searchString = ev.target.value;
  }

}
