import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
//import { SMS } from '@ionic-native/sms'
import {RadiostationsPage} from "../radiostations/radiostations";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {User} from "../../assets/config/interfaces";
//import {SmsProvider} from "../../providers/sms/sms";

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html'
})



export class VerificationPage {

  private   usersColl: AngularFirestoreCollection<User>;

  private uid:string;
  private displayName:string;
  private email:string;
  private provider:string;

  inputCode:string;
  inputSMSNumber:string;
  randomCode:string;
  options:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private smsVar: SMS,
    private afauth:AngularFireAuth,
    private afstore:AngularFirestore,
    //private smsProvider: SmsProvider
  ) {
    this.usersColl = this.afstore.collection("Users");
    this.uid = this.navParams.get("uid");
    this.displayName = this.navParams.get("displayName");
    console.log(this.navParams)
    this.email = this.navParams.get("email");
    this.provider = this.navParams.get("provider");
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
      //this.smsProvider.sendSMS(this.inputSMSNumber, this.randomCode);
      //this.sendSMS();
    }

  }

  sendSMS(){


/*
    this.smsVar.send(this.inputSMSNumber, this.randomCode, this.options)
      .then(()=>{
        alert("SMS Success");
      },()=>{
        alert("SMS Failed");
      });
      */
  }

  submit(){

    if ((this.inputCode == this.randomCode) &&
    (this.inputCode != '')) {
      alert("Registration successful");
      this.usersColl.doc(this.uid).set({
        displayName: this.displayName,
        email: this.email,
        phone: this.inputSMSNumber,
        provider: this.provider,
      })
      this.navCtrl.push(RadiostationsPage)

    }
    else {
      alert("Please try again");
    }

  }

  cancelVerification(){
    this.afauth.auth.signOut();
    this.navCtrl.popToRoot();
  }

  continue(){
    this.navCtrl.push(RadiostationsPage)
  }
}
