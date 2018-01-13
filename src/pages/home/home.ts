import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {RadiostationsPage} from "../radiostations/radiostations";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app'
import {FirebaseAuthProvider} from "../../providers/firebase-auth/firebase-auth";
import {FirebaseDatabaseProvider} from "../../providers/firebase-database/firebase-database";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private email:string;
  private password:string

  private loading:boolean;

  constructor(
    public navCtrl: NavController,
    private afauth:AngularFireAuth,
    private fbAuth:FirebaseAuthProvider,
    private fbData:FirebaseDatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.afauth.auth.onAuthStateChanged(currentUser => {
      //if there is a currentUser
      if(currentUser) {
        this.loading = true
        this.fbData.userExists(currentUser.uid)
          .then(result => {
            if(!result){

              this.fbData.addUser(currentUser.uid, {
                displayName:currentUser.displayName,
                email:currentUser.email,
                photoURL:currentUser.photoURL,
                info: 'I am a Banta User',
                noFollowing: 0,
                noFollowers: 0
              })
            }
            this.navCtrl.push(RadiostationsPage)
          })
          .catch(err => {
            console.log(err)
          })

      }
      else {  this.loading = false  }
    })

  }

  resetInput(){
    this.email = "";
    this.password = "";
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }


  providercheck(provider){
    switch(provider){
      case 'google.com':
        this.fbAuth.providerLogin(new firebase.auth.GoogleAuthProvider());
        break;
      case 'twitter.com':
        this.fbAuth.providerLogin(new firebase.auth.TwitterAuthProvider());
        break;
      case 'facebook':
        this.fbAuth.providerLogin(new firebase.auth.FacebookAuthProvider());
        break;
    }
  }

}
