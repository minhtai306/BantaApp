import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextboxPage } from './textbox';

@NgModule({
  declarations: [
    TextboxPage,
  ],
  imports: [
    IonicPageModule.forChild(TextboxPage),
  ],
})
export class TextboxPageModule {}
