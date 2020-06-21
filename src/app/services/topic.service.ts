import { take, map, shareReplay, defaultIfEmpty } from 'rxjs/operators';
import { Topic } from './../../models/topic.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as sharded from '../../libraries/sharded-counter';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topics$: Observable<Topic[]>;

  constructor(private af: AngularFirestore) {
    this.topics$ = this.af.collection<Topic>('topics', ref => ref.orderBy('votes', 'desc'))
    .valueChanges({ idField: 'id' })
    .pipe(shareReplay(1));
   }

  getTopics(): Observable<Topic[]> {
    return this.topics$;
  }

  getTopic(title: string): Observable<Topic | undefined> {
    return this.topics$.pipe(
      map(topics => topics.find(topic => topic.title === title)), defaultIfEmpty(undefined)
    );
  }

  getTopicTitles(): Observable<string[]> {
    return this.topics$.pipe(
      map(topics => topics.map(topic => topic.title))
    );
  }

  submitVote(id: string) {

    const docRef = firebase.firestore().doc(`topics/${id}`);

    const visits = new sharded.Counter(docRef, 'votes');
    visits.incrementBy(1);

  }

}
