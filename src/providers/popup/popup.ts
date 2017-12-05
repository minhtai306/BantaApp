import { Injectable } from '@angular/core';
import {PopoverController} from "ionic-angular";
import {PopoverPage} from "../../pages/popover/popover";

/*
  Generated class for the PopupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopupProvider {

  constructor(public popCtrl:PopoverController) {
  }

  openPopUp(title:string,content:string){
    this.popCtrl.create(PopoverPage,{title:title,content:content}).present();
  }



}
