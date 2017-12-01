import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import {RadiostationsPage} from "../radiostations/radiostations";
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
    //TODO store user data
    //TODO cross check password
    this.afauth.auth.createUserWithEmailAndPassword(this.email,this.password)
      .then((result) => {
        this.navCtrl.push(RadiostationsPage)
      })
      .catch((error)=>{
      console.log("shit")
        console.log(error)
        var data = {
          title: "Error",
          content: error.message
        }

        this.popCtrl.create(PopoverPage,data).present()

      })

  }

}
