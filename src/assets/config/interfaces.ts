export interface RadiostationId extends Radiostation { id: string; }
export interface Radiostation { title: string; frequency: string; phoneNumber:string }

export interface User {displayName:string;email:string;photoURL:string,info:string,noFollowers:number,noFollowing:number}

export interface Message{uid:string;displayName:string;message:string;date:string,time:string}

export interface Text {
  uid:string,
  rdId:string,
  photoUrl:string,
  displayName: string,
  noMsg: number ,
  noLikes: number,
  text: string,
  createdAt:number}
