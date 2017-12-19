import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from "../pages/register/register";
import {RadiostationsPage} from "../pages/radiostations/radiostations";
import {VerificationPage} from "../pages/verification/verification";
import {PopoverPage} from "../pages/popover/popover";
import {AdminradiostationsPage} from "../pages/adminradiostations/adminradiostations";
import {AdminTopicPage} from "../pages/admin-topic/admin-topic";
import {OptionsPage} from "../pages/options/options";
import {ChatPage} from "../pages/chat/chat";
import {TextsPage} from "../pages/texts/texts";


import {AngularFireModule} from 'angularfire2'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {SMS} from '@ionic-native/sms'
import {FCM} from "@ionic-native/fcm";
import { RadiostationProvider } from '../providers/radiostation/radiostation';
import { SmsProvider } from '../providers/sms/sms';
import {PopupProvider} from "../providers/popup/popup";

import {SearchPipe} from "../pipes/search/search";
import { FirebaseCloudMsgProvider } from '../providers/firebase-cloud-msg/firebase-cloud-msg';
import {HttpClientModule} from "@angular/common/http";
import { TextProvider } from '../providers/text/text';
import {TruncatePipe} from "../pipes/truncate/truncate";
import { UserProvider } from '../providers/user/user';
import {MomentModule} from "angular2-moment";

export const firebaseconfig = {
  apiKey: "AIzaSyB70l8eKDrXgg46VMwUu6Z9HSvZseOfiYk",
  authDomain: "banta-d0749.firebaseapp.com",
  databaseURL: "https://banta-d0749.firebaseio.com",
  projectId: "banta-d0749",
  storageBucket: "banta-d0749.appspot.com",
  messagingSenderId: "704951282979"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    RadiostationsPage,
    VerificationPage,
    PopoverPage,
    AdminradiostationsPage,
    AdminTopicPage,
    OptionsPage,
    ChatPage,
    TextsPage,
    SearchPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    RadiostationsPage,
    VerificationPage,
    PopoverPage,
    AdminradiostationsPage,
    AdminTopicPage,
    OptionsPage,
    ChatPage,
    TextsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    FCM,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RadiostationProvider,
    SmsProvider,
    PopupProvider,
    FirebaseCloudMsgProvider,
    TextProvider,
    UserProvider,
  ]
})
export class AppModule {}
