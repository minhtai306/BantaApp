import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  constructor(public afauth: AngularFireAuth) {
  }

  providerLogin(provider) {
    this.afauth.auth.signInWithRedirect(provider).then(()=>{
      this.afauth.auth.getRedirectResult()
        .then(result => { console.log(result)})
        .catch(error => { console.log(error)})
    })
  }

  userLogin(email:string,password:string){
    this.afauth.auth.signInWithEmailAndPassword(email,password)
      .then((result) => {
        console.log("success");
      })
      .catch((error)=>{
        console.log(error)
      })
  }

}
