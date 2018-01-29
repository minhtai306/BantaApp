import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

//pages
import { HomePage } from '../pages/home/home';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import {RegisterPage} from "../pages/register/register";
import {RadiostationsPage} from "../pages/radiostations/radiostations";
import {VerificationPage} from "../pages/verification/verification";
import {PopoverPage} from "../pages/popover/popover";
import {AdminradiostationsPage} from "../pages/adminradiostations/adminradiostations";
import {OptionsPage} from "../pages/options/options";
import {ChatPage} from "../pages/chat/chat";
import {TextsPage} from "../pages/texts/texts";
import {SocialsharePage} from "../pages/socialshare/socialshare";
import {OtherPage} from "../pages/other/other";
import {TextboxPage} from "../pages/textbox/textbox";

//providers
import { SmsProvider } from '../providers/sms/sms';
import {PopupProvider} from "../providers/popup/popup";
import {FirebaseDatabaseProvider} from "../providers/firebase-database/firebase-database";
import {FirebaseAuthProvider} from "../providers/firebase-auth/firebase-auth";
import { FirebaseCloudMsgProvider } from '../providers/firebase-cloud-msg/firebase-cloud-msg';

//AngularFire
import {AngularFireModule} from 'angularfire2'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";

//ionic native providers
import {SMS} from '@ionic-native/sms'
import {FCM} from "@ionic-native/fcm";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Screenshot} from "@ionic-native/screenshot";

//pipes
import {SearchPipe} from "../pipes/search/search";
import {AbsPipe} from "../pipes/abs/abs";
import {TruncatePipe} from "../pipes/truncate/truncate";

//modules
import {HttpClientModule} from "@angular/common/http";
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
    OptionsPage,
    ChatPage,
    TextsPage,
    SearchPipe,
    UserprofilePage,
    SocialsharePage,
    TruncatePipe,
    AbsPipe,
    OtherPage,
    TextboxPage
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
    OptionsPage,
    ChatPage,
    TextsPage,
    UserprofilePage,
    SocialsharePage,
    OtherPage,
    TextboxPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    FCM,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmsProvider,
    PopupProvider,
    FirebaseCloudMsgProvider,
    SocialSharing,
    Screenshot,
    FirebaseDatabaseProvider,
    FirebaseAuthProvider
  ]
})
export class AppModule {}
