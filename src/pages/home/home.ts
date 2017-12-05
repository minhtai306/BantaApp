import { Component } from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {RadiostationsPage} from "../radiostations/radiostations";
import {PopoverPage} from '../popover/popover'
import {VerificationPage} from "../verification/verification";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app'
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private email:string;
  private password:string
  constructor(public navCtrl: NavController,public popCtrl: PopoverController,private afauth:AngularFireAuth,private afstore:AngularFirestore) {
    this.afauth.auth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.afstore.collection("Users").doc(currentUser.uid).ref.get()
          .then(doc => {
            if(doc.exists){
              console.log("doc exsit")
              this.navCtrl.push(RadiostationsPage)
            }
            else{
              console.log("doc doesnt exist")
              this.navCtrl.push(VerificationPage,{
                uid:currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                provider: currentUser.providerId
              })
            }
          })
      }
    })
  }

  resetInput(){
    this.email = "";
    this.password = "";
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

  userLogin(){
    this.afauth.auth.signInWithEmailAndPassword(this.email,this.password)
      .then((result) => {
        console.log("success");
      })
      .catch((error)=>{
        console.log(error);
        var data = {
          title: "Error",
          content: error.message
        }
        this.resetInput()
        this.popCtrl.create(PopoverPage,data).present()
      })
  }


 providerLogin(provider) {
    this.afauth.auth.signInWithRedirect(provider).then(()=>{
      this.afauth.auth.getRedirectResult()
        .then(result => { console.log(result)})
        .catch(error => { console.log(error)})
    })
  }

  providercheck(provider){
    switch(provider){
      case 'google.com':
        this.providerLogin(new firebase.auth.GoogleAuthProvider());
        break;
      case 'twitter.com':
        this.providerLogin(new firebase.auth.TwitterAuthProvider());
        break;
      case 'facebook':
        this.providerLogin(new firebase.auth.FacebookAuthProvider());
        break;
    }
  }

}
