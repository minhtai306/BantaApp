import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Text, TextId} from "../../assets/config/interfaces";
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import moment from 'moment'
import {ChatPage} from "../chat/chat";
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

  private text:string
  private uid:string;
  private displayName:string;
  private radiostation:string;
  private freq:string;
  private photoUrl:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afstore:AngularFireDatabase,private afauth:AngularFireAuth) {
    this.uid = this.afauth.auth.currentUser.uid
    this.displayName = this.afauth.auth.currentUser.displayName
    this.photoUrl = this.afauth.auth.currentUser.photoURL

    console.log(this.navParams.data)
    this.radiostation = this.navParams.data.title
    this.freq = this.navParams.data.frequency
  }

  ionViewDidLoad() {
    this.textColl = this.afstore.list('/texts/'+ this.navParams.data.key,ref => ref.orderByChild('createdAt'));
    this.texts = this.textColl.snapshotChanges().map(text=>{
      return text.map(t=>({
        key:t.payload.key,
        ...t.payload.val(),
        date:moment.unix(t.payload.val().createdAt).format("MMM Do YY"),
        time:moment.unix(t.payload.val().createdAt).format('h:mm:ss a')
      }))
    })
    console.log(this.texts)
  }


  sendText(){
    let createdAt = 0 - moment().valueOf()
    let body = {uid:this.uid,photoUrl:this.photoUrl,displayName:this.displayName,noMsg: 0 ,text:this.text,createdAt:createdAt}
    this.textColl.push(body)
    this.text = '';
  }

  navToChat(text){
    this.navCtrl.push(ChatPage,{text:text,radiostation:this.radiostation,freq:this.freq})
  }

}
