import { Injectable } from '@angular/core';

/*
  Generated class for the TextProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TextProvider {

  private _createdAt:string
  private _date:string
  private _displayName:string
  private _key:string;
  private _noMsg:number;
  private _photoUrl:string
  private _text:string
  private _time:string
  private _uid:string

  setText(text:any){
    this._createdAt = text.createdAt
    this._date = text._date;
    this._displayName = text.displayName;
    this._key = text.key;
    this._noMsg = text.noMsg;
    this._photoUrl = text.photoUrl
    this._text = text.text
    this._time = text.time
    this._uid = text.uid
  }


  get createdAt(): string {
    return this._createdAt;
  }

  get date(): string {
    return this._date;
  }

  get displayName(): string {
    return this._displayName;
  }

  get key(): string {
    return this._key;
  }

  get noMsg(): number {
    return this._noMsg;
  }

  get photoUrl(): string {
    return this._photoUrl;
  }

  get text(): string {
    return this._text;
  }

  get time(): string {
    return this._time;
  }

  get uid(): string {
    return this._uid;
  }
}
