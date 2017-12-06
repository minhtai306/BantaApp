import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Message} from "../../assets/config/interfaces";
import {Observable} from "rxjs/Observable";
import firebase from 'firebase'
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
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
  private displayName:string;
  private radiostation:string;
  private freq:string;

  private message:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFireDatabase,private afauth:AngularFireAuth) {
    //subsribe to radiostation channel
    /*
    this.fcm.subscribeToTopic(this.navParams.data.id);
    this.fcm.onNotification().subscribe(data=>{
      console.log(data)
    })
    */
    this.radiostation = this.navParams.data.title
    this.freq = this.navParams.data.frequency
    this.uid = this.afauth.auth.currentUser.uid
    this.displayName = this.afauth.auth.currentUser.displayName
    this.msgColl = this.afstore.list('/channels/'+ this.navParams.data.id)
    this.messages = this.msgColl.valueChanges()

  }

  sendMessage() {
    console.log(this.message);
    let dateCreated = firebase.database.ServerValue.TIMESTAMP
    let body = {uid:this.uid,displayName:this.displayName,message:this.message,dateCreated:dateCreated}
    //let headers = new HttpHeaders();
    //headers.set('Authorization','key=AAAApCJe7SM:APA91bH5L79wZIg3-KginjC4xMtKjuI8yaL4W1KYTNNH4gzrD_wxgAuMoMlV1VsAD5EKvrvnfK5-CohLB0XqcxEgvGe3sL8A0BuoS1cADTjYXQnDTYDL6E1CTNwG-wlzJABfzziQVq8N')
    this.msgColl.push(body)
    this.message = '';
  }

}
