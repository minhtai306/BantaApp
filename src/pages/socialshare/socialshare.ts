import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";
import {Screenshot} from "@ionic-native/screenshot";
import {PopupProvider} from "../../providers/popup/popup";
import {AngularFireAuth} from "angularfire2/auth";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";

/**
 * Generated class for the SocialsharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-socialshare',
  templateUrl: 'socialshare.html',
})
export class SocialsharePage {

  //temp data
  private uid:string

  private message:string = "test share";
  private uri:string;
  private url:string = "http://www.bantabox.com";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sshare:SocialSharing,
    private sshot:Screenshot,
    private popUp:PopupProvider,
    private afauth:AngularFireAuth,
    private fbProvider:FirebaseDatabaseProvider
  ) {}

  ionViewDidLoad(){
    this.sshot.URI(80)
      .then(result=>{
        this.uri = result.URI
      })
      .catch(error=>console.log(error))
    this.uid = this.afauth.auth.currentUser.uid
  }


  shareTwitter(){
    this.sshare.canShareVia("twitter",this.message,this.uri,this.url)
      .then(result=>{
        this.sshare.shareViaTwitter(this.message,this.uri,this.url)
      })
      .catch(error=>{
        this.popUp.openPopUp("error","Please make sure the app is installed")
      })
  }

  shareFacebook(){
    this.sshare.canShareVia("facebook",this.message,this.uri,this.url)
      .then(result=>{
        this.sshare.shareViaFacebook(this.message,this.uri,this.url)
      })
      .catch(error=>{
        this.popUp.openPopUp("error","Please make sure the app is installed")
      })
  }

  shareInstagram(){
    this.sshare.canShareVia("instagram",this.message,this.uri,this.url)
      .then(result=>{
        this.sshare.shareViaInstagram(this.message,this.uri)
      })
      .catch(error=>{
        this.popUp.openPopUp("error","Please make sure the app is installed")
      })
  }

  shareWhatsApp(){
    this.sshare.canShareVia("whatsapp",this.message,this.uri,this.url)
      .then(result=>{
        this.sshare.shareViaWhatsApp(this.message,this.uri,this.url)
      })
      .catch(error=>{
        this.popUp.openPopUp("error","Please make sure the app is installed")
      })
  }
}
