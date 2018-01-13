import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OptionsPage} from "../options/options";
import {Observable} from "rxjs/Observable";
import {RadiostationId} from "../../assets/config/interfaces";
import {TextsPage} from "../texts/texts";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

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

  private radiostations: Observable<RadiostationId[]>
  private searchString:string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fbProve:FirebaseDatabaseProvider
  ) {
    this.searchString = '';
    this.radiostations = this.fbProve.getRadioStations()
  }


  navToTopics(radiostation:RadiostationId){
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
