import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {User} from "../../assets/config/interfaces";

/*
  Generated class for the FirebaseDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDatabaseProvider {

  constructor(public afstore: AngularFirestore) {
  }

  docExists(path:string,docId:string,){
    this.afstore.collection(path).doc(docId).ref.get()
      .then(doc =>{
        if(doc.exists){
          return true
        }
        else{
          return false;
        }
      })
  }

  addToCollection(path:string,docId:string,data){
    this.afstore.collection(path).doc(docId).set(data)
  }

  collectionData(path:string){
    this.afstore.collection(path).snapshotChanges()
  }

}
