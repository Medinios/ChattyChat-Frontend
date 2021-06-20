import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {tap , map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore ) { }

  addMessagesHistory(data, username) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("messagesHistory")
            .add({history: data , date: Date.now() , username: username})
            .then(res => {}, err => reject(err));
    });
  }

  readMessagesHistory(username) {
   return this.firestore.collection("messagesHistory", ref => ref.where("username","==",username)).valueChanges().pipe(
      tap(docs => console.log('docs', docs)),
      map(val => val.length > 0 ? val[0] : null)
    )
  }
}
