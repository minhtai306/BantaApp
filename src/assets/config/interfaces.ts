export interface RadiostationId extends Radiostation { id: string; }
export interface Radiostation { title: string; frequency: string; phoneNumber:string }

export interface User {uid:string}

export interface Message{uid:string;displayName:string;message:string;date:string,time:string}

export interface TextId extends Text {id:string}
export interface Text {uid:string;photoUrl:string;displayName:string;text:string,date:string,time:string}
