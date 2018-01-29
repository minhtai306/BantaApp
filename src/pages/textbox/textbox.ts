import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Text} from "../../assets/config/interfaces";
import {UserprofilePage} from "../userprofile/userprofile";
import {SocialsharePage} from "../socialshare/socialshare";
import {AngularFireAuth} from "angularfire2/auth";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {ChatPage} from "../chat/chat";

/**
 * Generated class for the TextboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-textbox',
  templateUrl: 'textbox.html',
})
export class TextboxPage {
  @Input() text: Text

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afauth:AngularFireAuth,
    public popCtrl: PopoverController,
    public fbProv:FirebaseDatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextboxPage');
  }

  socialShareOpt(){
    this.popCtrl.create(SocialsharePage).present()
  }

  like(text){
    this.fbProv.incrementLike(text.key,this.afauth.auth.currentUser.uid)
  }

  unlike(text){
    this.fbProv.decrementLike(text.key,this.afauth.auth.currentUser.uid)
  }

  navtoUserProfile(textUid:string){
    this.navCtrl.push(UserprofilePage,{uid:textUid})
  }

  navToChat(text){
    this.navCtrl.push(ChatPage,{text:text,radiostation:this.navParams.data})
  }

}
