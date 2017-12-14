import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import {Message} from "../../assets/config/interfaces";
import {Observable} from "rxjs/Observable";
import firebase from 'firebase'
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import moment from 'moment'
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";
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

  @ViewChild(Content) content: Content;

  private followFlag:boolean;

  private msgColl:AngularFireList<Message>
  private messages:Observable<Message[]>;

  private radiostation:string;
  private freq:string;

  private textuid:string
  private uid:string
  private textDisplayName:string;
  private photoUrl:string;
  private date:string;
  private time:string;
  private text:string;

  private chatPhotoUrl:string
  private chatDisplayName:string;

  private message:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFireDatabase,private afauth:AngularFireAuth) {
    //subsribe to radiostation channel
    /*
    this.fcm.subscribeToTopic(this.navParams.data.id);
    this.fcm.onNotification().subscribe(data=>{
      console.log(data)
    })
    */

    this.followFlag = false;
    this.message = '';
    this.radiostation = this.navParams.data.radiostation
    this.freq = this.navParams.data.freq

    this.textuid = this.navParams.data.text.uid
    this.textDisplayName = this.navParams.data.text.displayName
    this.photoUrl = this.navParams.data.text.photoUrl
    this.text = this.navParams.data.text.text
    this.date = this.navParams.data.text.date;
    this.time = this.navParams.data.text.time;

    this.chatDisplayName = this.afauth.auth.currentUser.displayName
    this.uid = this.afauth.auth.currentUser.uid
    this.chatPhotoUrl = this.afauth.auth.currentUser.photoURL

    this.msgColl = this.afstore.list('/chats/'+ this.navParams.data.text.key)
    this.messages = this.msgColl.valueChanges()

  }

  ionViewDidEnter(){
    this.scrollToBottom()
  }

  scrollToBottom(){
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 300);
  }

  sendMessage() {
    if(this.message != '') {
      let date = moment().format("MMM Do YY");
      let time = moment().format('h:mm:ss a');
      let body = {
        uid: this.uid,
        photoUrl: this.chatPhotoUrl,
        displayName: this.chatDisplayName,
        message: this.message,
        date: date,
        time: time
      }
      //let headers = new HttpHeaders();
      //headers.set('Authorization','key=AAAApCJe7SM:APA91bH5L79wZIg3-KginjC4xMtKjuI8yaL4W1KYTNNH4gzrD_wxgAuMoMlV1VsAD5EKvrvnfK5-CohLB0XqcxEgvGe3sL8A0BuoS1cADTjYXQnDTYDL6E1CTNwG-wlzJABfzziQVq8N')
      this.msgColl.push(body)
      this.message = '';
      this.scrollToBottom()
    }
  }

  toggleFollow(){
    this.followFlag = !this.followFlag
  }

}
