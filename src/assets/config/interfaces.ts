export interface RadiostationId extends Radiostation { id: string; }
export interface Radiostation { title: string; frequency: string; }

export interface User {admin:boolean;email:string;firstName:string,lastName:string;identity:string;phone:string;verified:boolean}

export interface Message{uid:string;displayName:string;message:string;date:string,time:string}

export interface TextId extends Text {id:string}
export interface Text {uid:string;photoUrl:string;displayName:string;text:string,date:string,time:string}
