import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from "firebase";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

/**
 * Generated class for the AdminTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Topic { radiostationId:string,topicName: string}

@IonicPage()
@Component({
  selector: 'page-admin-topic',
  templateUrl: 'admin-topic.html',
})
export class AdminTopicPage {

  private radiostationId: string;
  private topicName:string;

  private topicColl: AngularFirestoreCollection<Topic>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFirestore) {
    this.topicColl = this.afstore.collection("Topics");
    this.radiostationId = this.navParams.get("id");

  }

  addTopic() {
    console.log(this.topicName);
    this.topicColl.add({radiostationId:this.radiostationId,topicName: this.topicName})
    this.navCtrl.pop()
  }

}
