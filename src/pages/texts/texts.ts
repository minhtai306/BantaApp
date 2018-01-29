import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import moment from 'moment'
import {ChatPage} from "../chat/chat";
import {SmsProvider} from "../../providers/sms/sms";
import {FirebaseCloudMsgProvider} from "../../providers/firebase-cloud-msg/firebase-cloud-msg";
import {PopoverController} from "ionic-angular";
import {SocialsharePage} from "../socialshare/socialshare";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {UserprofilePage} from "../userprofile/userprofile";

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
  private replies:Observable<any[]>

  private radiostation:string;
  private frequency:string;

  private text:string
  private uid:string;
  private displayName:string;
  private photoUrl:string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afstore:AngularFireDatabase,
    private afauth:AngularFireAuth,
    private sms:SmsProvider,
    private fcm:FirebaseCloudMsgProvider,
    private popCtrl:PopoverController,
    private fbProv:FirebaseDatabaseProvider
  ) {

    //retrieve naviagtion paramaters for radiostation
    this.radiostation = this.navParams.data.title
    this.frequency = this.navParams.data.frequency

    //retrieve user information
    let currentUser = this.afauth.auth.currentUser
    this.uid = currentUser.uid
    this.displayName = currentUser.displayName
    this.photoUrl = currentUser.photoURL

    //get texts to this radiostation
    this.texts = this.fbProv.getTexts(this.navParams.data.key,this.afauth.auth.currentUser.uid,0)
  }


  sendText(){
    let createdAt = 0 - moment().unix()
    let body = {
      uid:this.uid,
      rdId:this.navParams.data.key,
      photoUrl:this.photoUrl,
      displayName: this.displayName,
      noMsg: 0 ,
      noLikes: 0,
      text:this.text,
      createdAt:createdAt
    }

    this.sms.sendSMS(this.navParams.data.phoneNumber,this.text)
    this.fbProv.addText(body)
    this.fcm.sendNotification(this.displayName,this.text)

    this.text = '';
  }


 show(text,txtKey){
    this.replies = this.fbProv.getChats(txtKey)
    text.showReplies = !text.showReplies
  }

  navToChat(text){
    this.navCtrl.push(ChatPage,{text:text,radiostation:this.navParams.data})
  }

}
