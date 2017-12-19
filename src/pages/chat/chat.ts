import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import {Message} from "../../assets/config/interfaces";
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import moment from 'moment'
import {RadiostationProvider} from "../../providers/radiostation/radiostation";
import {TextProvider} from "../../providers/text/text";
import {SocialSharing} from "@ionic-native/social-sharing";

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

  private msgColl:AngularFireList<Message>
  private messages:Observable<Message[]>;

  private radiostation:string;
  private frequency:string;

  private textuid:string
  private textDisplayName:string;
  private textPhotoUrl:string;
  private date:string;
  private time:string;
  private text:string;
  private textNoMsg:number;

  private chatUid:string
  private chatPhotoUrl:string
  private chatDisplayName:string;

  private message:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afstore:AngularFireDatabase,
    private afauth:AngularFireAuth,
    private rdProvider:RadiostationProvider,
    private txtProvider:TextProvider
  ) {
    this.seeMoreFlag = false;
    this.followFlag  = false;
    this.message = '';

    this.radiostation = this.rdProvider.frequency
    this.frequency    = this.rdProvider.frequency

    this.textPhotoUrl     = this.txtProvider.photoUrl
    this.textuid          = this.txtProvider.uid
    this.textDisplayName  = this.txtProvider.displayName
    this.date             = this.txtProvider.date
    this.time             = this.txtProvider.time
    this.text             = this.txtProvider.text
    this.textNoMsg        = this.txtProvider.noMsg


    this.chatDisplayName = this.afauth.auth.currentUser.displayName
    this.chatUid = this.afauth.auth.currentUser.uid
    this.chatPhotoUrl = this.afauth.auth.currentUser.photoURL
    if(!this.chatPhotoUrl){this.chatPhotoUrl = "assets/imgs/empty-avatar.jpg"}
    this.msgColl = this.afstore.list('/chats/'+ this.txtProvider.key);
    this.messages = this.msgColl.valueChanges()
  }
    //subsribe to radiostation channel
    /*
    this.fcm.subscribeToTopic(this.navParams.data.id);
    this.fcm.onNotification().subscribe(data=>{
      console.log(data)
    })
    */
  ionViewDidEnter(){
    this.scrollToBottom()
    console.log(this.text.length)
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
        photoUrl: this.chatPhotoUrl,
        displayName: this.chatDisplayName,
        message: this.message,
        date: date,
        time: time
      }
      //let headers = new HttpHeaders();
      //headers.set('Authorization','key=AAAApCJe7SM:APA91bH5L79wZIg3-KginjC4xMtKjuI8yaL4W1KYTNNH4gzrD_wxgAuMoMlV1VsAD5EKvrvnfK5-CohLB0XqcxEgvGe3sL8A0BuoS1cADTjYXQnDTYDL6E1CTNwG-wlzJABfzziQVq8N')
      this.msgColl.push(body)
      this.textNoMsg = this.textNoMsg + 1
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

  ionViewWillLeave(){
    let update = this.afstore.object('texts/'+this.rdProvider.key+'/'+this.txtProvider.key)
    update.update({noMsg:this.textNoMsg})

  }

}
