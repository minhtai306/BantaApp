import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms'

/*
  Generated class for the SmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsProvider {

  public options: any = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      //intent: 'INTENT'  // Opens Default sms app
      //intent: '' // Sends sms without opening default sms app
      intent: ''
    }
  }

  public recepientNo: string = '';
  public message: string = '';

  constructor(private smsVar: SMS) {
  }

  sendSMS(recepientNo, message){
      this.recepientNo = recepientNo;
      this.message = message;

    this.smsVar.send(this.recepientNo, this.message, this.options)
      .then(()=>{
        alert("SMS Success");
      },()=>{
        alert("SMS Failed");
      });
  }

}
