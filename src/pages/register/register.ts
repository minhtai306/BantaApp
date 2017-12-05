import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import {VerificationPage} from "../verification/verification";
import {PopoverPage} from "../popover/popover";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private username:string;
  private email:string;
  private password:string;
  private confirmPassword:string;
  private firstName:string;
  private  lastName:string;

  registerDisabled: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public popCtrl: PopoverController,private afauth:AngularFireAuth) {
  }

  terms(){
    this.registerDisabled = false;
  }

  registerUser(){

    if(this.password === this.confirmPassword) {
      this.afauth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          result.updateProfile({displayName:this.username})
            .then((user)=> {
              console.log("new")
              console.log(user)
              console.log(result)
              this.navCtrl.push(VerificationPage, {
                uid: result.uid,
                displayName: result.displayName,
                email: result.email,
                provider: result.providerId
              })
            })
        })
        .catch((error) => {
          this.errorMessage("Error",error.message)
        })
    }
    else{
      this.errorMessage("Error","Passwords do not match")
    }
  }

  errorMessage(title:string,content:string){
    this.popCtrl.create(PopoverPage, {title: title,content:content}).present()
  }

}
