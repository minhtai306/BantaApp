export interface RadiostationId extends Radiostation { id: string; }
export interface Radiostation { title: string; frequency: string; }

export interface User {admin:boolean;email:string;firstName:string,lastName:string;identity:string;phone:string;verified:boolean}

export interface Topic { radiostationId:string,topicName: string}

export interface Message{uid:string;displayName:string;message:string;dateCreated:any}
