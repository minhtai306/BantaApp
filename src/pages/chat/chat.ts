import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Message} from "../../assets/config/interfaces";
import {Observable} from "rxjs/Observable";
import firebase from 'firebase'
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  private msgColl:AngularFireList<Message>
  private messages:Observable<Message[]>;

  private uid:string

  private message:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFireDatabase,private afauth:AngularFireAuth) {
    //subsribe to radiostation channel
    /*this.fcm.subscribeToTopic(this.navParams.data.id);
    this.fcm.onNotification().subscribe(data=>{
      console.log(data)
    })*/
    this.uid = this.afauth.auth.currentUser.uid
    this.msgColl = this.afstore.list('/channels/'+ this.navParams.data.id)
    this.messages = this.msgColl.valueChanges()

  }

  sendMessage() {
    console.log(this.message);
    let dateCreated = firebase.database.ServerValue.TIMESTAMP
    this.msgColl.push({uid:this.uid,message:this.message,dateCreated:dateCreated})
  }

}
