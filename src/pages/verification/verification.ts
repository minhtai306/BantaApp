import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { SMS } from '@ionic-native/sms'
import {RadiostationsPage} from "../radiostations/radiostations";

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html'
})



export class VerificationPage {

  inputCode:string;
  inputSMSNumber:string;
  randomCode:string;
  options:any;

  constructor(public navCtrl: NavController, private smsVar: SMS,private afauth:AngularFireAuth) {

    this.inputCode = '';
    this.inputSMSNumber = '';
    this.randomCode = '';
    this.options = '';
  }



  prepareSMS() {
    this.randomCode = (Math.floor(1000 + Math.random() * 9000)).toString();

    this.options={
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        //intent: 'INTENT'  // Opens Default sms app
        //intent: '' // Sends sms without opening default sms app
        intent: ''
      }
    }

    if (this.inputSMSNumber == '') {
      alert("Please enter a valid SMS number");
    }
    else {
      this.sendSMS();
    }

  }

  sendSMS(){



    this.smsVar.send(this.inputSMSNumber, this.randomCode, this.options)
      .then(()=>{
        alert("SMS Success");
      },()=>{
        alert("SMS Failed");
      });
  }

  submit(){

    if (this.inputCode == this.randomCode) {
      alert("Registration successful");
    }
    else {
      alert("Please try again");
    }

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
