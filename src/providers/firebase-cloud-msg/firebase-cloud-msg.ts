import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FCM} from "@ionic-native/fcm";
import {RequestOptions} from "@angular/http";

/*
  Generated class for the FirebaseCloudMsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseCloudMsgProvider {

  private static fcmUrl = "https://fcm.googleapis.com/fcm/send";
  private static authKey = "key=" +
    "AAAApCJe7SM:APA91bH5L79wZIg3-KginjC4xMtKjuI8yaL4W1KYTNNH4gzrD_wxgAuMoMlV1VsAD5EKvrvnfK5-CohLB0XqcxEgvGe3sL8A0BuoS1cADTjYXQnDTYDL6E1CTNwG-wlzJABfzziQVq8N";

  constructor(public http: HttpClient,private fcm:FCM) { }

  subscribe(topic:string){
    this.fcm.subscribeToTopic(topic)
  }

  sendNotification(name:string,content:string) {


    let body = JSON.stringify({
      "notification": {
        "title": name,
        "body": content,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "to": "/topics/-L0CZxJ0sRWHwFf_q_wQ"
    });

    let headers = new HttpHeaders({
        'Authorization': FirebaseCloudMsgProvider.authKey,
      "Content-Type" : "application/json"
    })


    console.log(headers)
  console.log("posting")
    this.http.post(FirebaseCloudMsgProvider.fcmUrl, body, {headers: headers}).toPromise()
      .then(res=>console.log(res))
      .catch(err=>console.log(err))

  }

  listen(){
    this.fcm.onNotification()
  }

}
