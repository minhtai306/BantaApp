import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private _uid:string
  private _email:string;
  private _displayName:string;
  private _photoURL:string;

  setUser(user){
    this._uid = user.uid
    this._email = user.email;
    this._displayName = user.displayName;
    if(user.photoURL){this._photoURL = user.photoURL}
    else{ this._photoURL = 'assets/imgs/empty-avatar.jpg'}
  }


  get uid(): string {
    return this._uid;
  }

  get email(): string {
    return this._email;
  }

  get displayName(): string {
    return this._displayName;
  }

  get photoURL(): string {
    return this._photoURL;
  }
}
