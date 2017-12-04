import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminTopicPage } from './admin-topic';

@NgModule({
  declarations: [
    AdminTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminTopicPage),
  ],
})
export class AdminTopicPageModule {}
