import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the RadiostationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RadiostationProvider {

  private _key:string;
  private _radiostationName:string;
  private _frequency:string;
  private _phoneNumber:string

  setRadioStation(radiostation:any){
    this._key = radiostation.key
    this._radiostationName = radiostation.title
    this._frequency = radiostation.frequency
    this._phoneNumber = radiostation.phoneNumber
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get key(): string {
    return this._key;
  }

  get frequency(): string {
    return this._frequency;
  }

  get radiostationName(): string {
    return this._radiostationName;
  }

}
