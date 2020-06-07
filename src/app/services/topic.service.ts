import { take, map, shareReplay, defaultIfEmpty } from 'rxjs/operators';
import { Topic } from './../../models/topic.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topics$: Observable<Topic[]>;

  constructor(private af: AngularFirestore) {
    this.topics$ = this.af.collection<Topic>('topics').valueChanges().pipe(shareReplay(1));
   }

  getTopics(): Observable<Topic[]> {
    return this.topics$;
  }

  getTopic(title: string): Observable<Topic | null> {

    return this.topics$.pipe(
      map(topics => topics.find(topic => topic.title === title)), defaultIfEmpty(null)
    );

  }

}
