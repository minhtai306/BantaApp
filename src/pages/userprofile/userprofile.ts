import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  private texts:Observable<Text>
  private user:any;
  private isFollowing:boolean

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afauth:AngularFireAuth,
    private fbProv:FirebaseDatabaseProvider
  ) {

    //Retrive users profile data
    this.user = this.fbProv.getUser(this.navParams.data.uid)
    //retrive texts sent by this user
    this.texts = this.fbProv.getTexts(null,this.navParams.data.uid,1)
    //check to see if current user is follow this user
    this.fbProv.isFollowing(this.afauth.auth.currentUser.uid,this.navParams.data.uid)
      .then (res=>{ this.isFollowing = res.following})
      .catch(err=>{ this.isFollowing = err          })

  }

  follow(){
    //add new follower
    this.fbProv.newFollower(this.navParams.data.uid,this.afauth.auth.currentUser.uid)
    //set following to true
    this.isFollowing =  true;
  }

  unfollow(){
    //remove user following
    this.fbProv.loseFollower(this.navParams.data.uid,this.afauth.auth.currentUser.uid)
    //set following to false
    this.isFollowing = false;
  }

}
