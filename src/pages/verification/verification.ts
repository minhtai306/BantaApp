import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { SMS } from '@ionic-native/sms'
import {RadiostationsPage} from "../radiostations/radiostations";

var inputNumber:string;
var SMSNumber:string;

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html'
})



export class VerificationPage {

  constructor(public navCtrl: NavController, private smsVar: SMS,private afauth:AngularFireAuth) {

  }


  sendSMS(){

    var options={
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        //intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
        intent: ''
      }
    }
    this.smsVar.send('+61487544987', '3354',options)
      .then(()=>{
        alert("success");
      },()=>{
        alert("failed");
      });
  }

  submit(){

    alert("Registration successful");
  }


  signOut() {
    this.afauth.auth.signOut().then(result =>{
      console.log("signed out")
      this.navCtrl.pop()
    })
  }

  //testing for continuing to navigate to radio station page
  radiostations(){
    this.navCtrl.push(RadiostationsPage)
  }
}
