import { Injectable } from '@angular/core';

/*
  Generated class for the RadiostationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RadiostationProvider {

  private _radiostationName:string;

  get radiostationName(): string {
    return this._radiostationName;
  }

  set radiostationName(value: string) {
    this._radiostationName = value;
  }

}
