import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, PopoverController} from 'ionic-angular';
import {Message} from "../../assets/config/interfaces";
import {Observable} from "rxjs/Observable";
import {AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import moment from 'moment'
import {SocialsharePage} from "../socialshare/socialshare";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

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
  private seeMoreFlag:boolean

  private messages:Observable<Message[]>;
  private text:Observable<Text>
  private liked:Observable<any>

  private radiostation:string;
  private frequency:string;

  private chatUid:string
  private chatPhotoUrl:string
  private chatDisplayName:string;

  private message:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afauth:AngularFireAuth,
    private popCtrl:PopoverController,
    private fbProv:FirebaseDatabaseProvider
  ) {
    this.seeMoreFlag = false;
    this.followFlag  = false;
    this.message     = '';

    //retrieve naviagtion paramaters for radiostation
    this.radiostation = this.navParams.data.radiostation.title;
    this.frequency    = this.navParams.data.radiostation.frequency


    //retrieve current user data
    this.chatDisplayName = this.afauth.auth.currentUser.displayName
    this.chatPhotoUrl    = this.afauth.auth.currentUser.photoURL
    this.chatUid         = this.afauth.auth.currentUser.uid

    if(!this.chatPhotoUrl){this.chatPhotoUrl = "assets/imgs/empty-avatar.jpg"}

    //retrieve this text for realtime database
    this.text = this.fbProv.getText(this.navParams.data.text.key)
    this.liked = this.fbProv.likedText(this.navParams.data.text.key,this.afauth.auth.currentUser.uid)
    //retrieve messages to this text from firebase real time database
    this.messages = this.fbProv.getChats(this.navParams.data.text.key)
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
        uid: this.chatUid,
        txtKey:this.navParams.data.text.key,
        photoUrl: this.chatPhotoUrl,
        displayName: this.chatDisplayName,
        message: this.message,
        date: date,
        time: time
      }
      //let headers = new HttpHeaders();
      //headers.set('Authorization','key=AAAApCJe7SM:APA91bH5L79wZIg3-KginjC4xMtKjuI8yaL4W1KYTNNH4gzrD_wxgAuMoMlV1VsAD5EKvrvnfK5-CohLB0XqcxEgvGe3sL8A0BuoS1cADTjYXQnDTYDL6E1CTNwG-wlzJABfzziQVq8N')
      this.fbProv.addChat(body)
      this.fbProv.incrementChat(this.navParams.data.text.key)
      this.message = '';
      this.scrollToBottom()
    }
  }

  toggleFollow(){
    this.followFlag = !this.followFlag
  }

  toggleFullText(){
    this.seeMoreFlag = !this.seeMoreFlag
  }


  socialShareOpt(){
    this.popCtrl.create(SocialsharePage).present()
  }

  like(){
    this.fbProv.incrementLike(this.navParams.data.text.key,this.afauth.auth.currentUser.uid)
  }

  unlike(){
    this.fbProv.decrementLike(this.navParams.data.text.key,this.afauth.auth.currentUser.uid)
  }
}
