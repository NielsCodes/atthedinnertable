import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Contribution } from 'src/models/contribution.model';
import { shareReplay, defaultIfEmpty, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  contributions$: Observable<Contribution[]>;

  constructor(private af: AngularFirestore) {
    this.contributions$ = this.af.collection<Contribution>('contributions').valueChanges().pipe(shareReplay(1));
  }

  // Get all contribtions
  getContributions(): Observable<Contribution[]> {
    return this.contributions$;
  }


  // Get single contribution by its ID
  getContribution(id: string): Observable<Contribution | undefined> {

    return this.contributions$.pipe(
      map(contributions => contributions.find(contribution => contribution.id === id)), defaultIfEmpty(undefined)
    );

  }

}
