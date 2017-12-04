export interface RadiostationId extends Radiostation { id: string; }
export interface Radiostation { title: string; frequency: string; }
export interface Topic { radiostationId:string,topicName: string}
