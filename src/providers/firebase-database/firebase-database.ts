import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from "firebase";
import {Message, Text, User} from "../../assets/config/interfaces";
/*
  Generated class for the FirebaseDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDatabaseProvider {


  constructor(public afstore: AngularFireDatabase) {
  }

  getUsers(): any{
    return this.afstore.list('/users').valueChanges()
  }

  getUser(uid:string): any{
    return this.afstore.object("users/" + uid ).valueChanges()
  }

  userExists(uid:string): Promise<boolean> {
    let promise = new Promise((res,rej) => {
      this.afstore.object('users/'+uid).valueChanges()
        .subscribe(usr => {
          if(usr){  res(true) }
          else   {  rej(false)}
        })
    })
      .then(
        (res) => { return res},
        (rej) => { return rej}
      )
    return promise
  }

  addUser(uid:string,user:User){
    let users = this.afstore.list('users');
    users.update(uid,user)
  }

  getRadioStations():any{
    let rdCollection = this.afstore.list('/radiostations')
    return rdCollection.snapshotChanges()
      .map(radiostation=>{
        return radiostation.map(r=>({key:r.payload.key,...r.payload.val()}))
      });
  }

  getTexts(rdKey:string,uid:string,opt:number):any{
    var txtCollection;
    if(opt == 0) {
      txtCollection = this.afstore.list('texts', ref => ref.orderByChild('rdId').equalTo(rdKey));
    }
    else{
      txtCollection = this.afstore.list('texts', ref => ref.orderByChild('uid').equalTo(uid))
    }
    return txtCollection.snapshotChanges().map(text => {
      return text.map(t => ({
        key: t.payload.key,
        ...t.payload.val(),
        time: Math.abs(t.payload.val().createdAt),
        showReplies: false,
        liked: this.likedText(t.payload.key,uid),
        replies : this.afstore.list('chats',ref => ref.orderByChild('txtKey').equalTo(t.payload.key)).valueChanges()
      }))
    })
  }

  getText(txtKey:string):any{
    return this.afstore.object("texts/" + txtKey).valueChanges()
  }

  addText(text:Text){
    this.afstore.list('texts').push(text)
  }
  getChats(txtKey:string):any{
    return this.afstore.list('chats',ref => ref.orderByChild('txtKey').equalTo(txtKey)).valueChanges()
  }

  addChat(chatMsg:Message){
    this.afstore.list('chats').push(chatMsg)
  }

  incrementLike(textId,uid){
    let numlikes = firebase.database().ref('texts/'+textId).child('noLikes')
    numlikes.transaction(likes=>{ return likes + 1 })
    this.afstore.list('users/' + uid + '/likes').update(textId,{like:true})
  }

  decrementLike(textId,uid){
    let numlikes = firebase.database().ref('texts/'+textId).child('noLikes')
    numlikes.transaction(likes=>{ return likes - 1 })
    this.afstore.list('users/' + uid + '/likes').update(textId,{like:false})
  }

  likedText(textId,uid){
    return this.afstore.object('users/' + uid + '/likes/' + textId).valueChanges()
  }

  incrementChat(textId){
    let likes = firebase.database().ref('texts/' + textId).child('noMsg')
    likes.transaction(chats=>{
      return chats + 1
    })
  }

  newFollower(userToFollowUid,userFollowingUid){
    let userNumFollowers = firebase.database().ref('users/' + userToFollowUid).child('noFollowers')
    let userNumFollowing = firebase.database().ref('users/' + userFollowingUid).child('noFollowing')
    userNumFollowers.transaction(num=> {return num + 1})
    userNumFollowing.transaction(num=> {return num + 1})
    this.afstore.list('users/'+ userToFollowUid  + '/followers' ).update(userFollowingUid,{followed   : true})
    this.afstore.list('users/'+ userFollowingUid + '/following' ).update(userToFollowUid ,{following  : true})
  }

  loseFollower(userToFollowUid,userFollowingUid) {
    let userNumFollowers = firebase.database().ref('users/' + userToFollowUid).child('noFollowers')
    let userNumFollowing = firebase.database().ref('users/' + userFollowingUid).child('noFollowing')
    userNumFollowers.transaction(num=> {return num - 1})
    userNumFollowing.transaction(num=> {return num - 1})
    this.afstore.list('users/'+ userToFollowUid  + '/followers' ).update(userFollowingUid,{followed   : false})
    this.afstore.list('users/'+ userFollowingUid + '/following' ).update(userToFollowUid ,{following  : false})
  }

    isFollowing(currentUid,followingUid): any{
    console.log("checking if " + currentUid + " is following " + followingUid)
     let promise = new Promise((res,rej)=>{
      this.afstore.object('users/'+currentUid + '/following/' + followingUid).valueChanges()
         .subscribe(follower=>{
           if(follower){
             res(follower)
           }
           else{
             rej(false)
           }
         })
     })
       .then(res=>{return res})
       .catch(err=>{return err})

    return promise
  }
}
