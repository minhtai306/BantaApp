import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Text, TextId} from "../../assets/config/interfaces";
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import moment from 'moment'
import {ChatPage} from "../chat/chat";
import {SmsProvider} from "../../providers/sms/sms";
import {FirebaseCloudMsgProvider} from "../../providers/firebase-cloud-msg/firebase-cloud-msg";
import {RadiostationProvider} from "../../providers/radiostation/radiostation";
import {TextProvider} from "../../providers/text/text";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the TextsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-texts',
  templateUrl: 'texts.html',
})
export class TextsPage {

  private textColl:AngularFireList<any>
  private texts:Observable<any[]>;

  private radiostation:string;
  private frequency:string;

  private text:string
  private uid:string;
  private displayName:string;
  private photoUrl:string;

  private timestamp:Date

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afstore:AngularFireDatabase,
    private afauth:AngularFireAuth,
    private sms:SmsProvider,
    private fcm:FirebaseCloudMsgProvider,
    private rdProvider:RadiostationProvider,
    private txtProvider:TextProvider,
    private usrProvider:UserProvider
  ) {
    this.textColl = this.afstore.list('/texts/' + this.rdProvider.key, ref => ref.orderByChild('createdAt'));
    this.texts = this.textColl.snapshotChanges().map(text => {
      return text.map(t => ({
        key: t.payload.key,
        ...t.payload.val(),
        time: Math.abs(t.payload.val().createdAt)
      }))
    })
  }


  ionViewDidLoad() {
    //this.fcm.subscribe(this.rdProvider.key)
    //this.fcm.listen()

    this.uid = this.afauth.auth.currentUser.uid
    this.displayName = this.afauth.auth.currentUser.displayName
    this.photoUrl = this.afauth.auth.currentUser.photoURL
    if(!this.photoUrl){this.photoUrl = "assets/imgs/empty-avatar.jpg"}


    this.radiostation = this.rdProvider.radiostationName
    this.frequency = this.rdProvider.frequency
  }


  sendText(){
    let createdAt = 0 - moment().unix()
    let body = {
      uid:this.uid,
      photoUrl:this.photoUrl,
      displayName: this.displayName,
      noMsg: 0 ,
      text:this.text,
      createdAt:createdAt
    }
    //0413424810
    this.sms.sendSMS(this.rdProvider.phoneNumber,this.text)
    this.textColl.push(body)
    this.fcm.sendNotification(this.displayName,this.text)
    this.text = '';
  }

  navToChat(text){
    //text
    this.txtProvider.setText(text);
    this.navCtrl.push(ChatPage)
  }

}
