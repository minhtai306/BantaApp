import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import {VerificationPage} from "../verification/verification";
import {PopoverPage} from "../popover/popover";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {UserProvider} from "../../providers/user/user";
import {RadiostationsPage} from "../radiostations/radiostations";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popCtrl: PopoverController,
    private afauth:AngularFireAuth,
    private afstore:AngularFireDatabase,
    private usrProvider:UserProvider) {
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
              this.navCtrl.pop()
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
