import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Contribution } from 'src/models/contribution.model';
import { shareReplay, defaultIfEmpty, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private contributions$: Observable<Contribution[]>;

  constructor(
    private af: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {
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

  async createContribution(data: Contribution) {
    const user = await this.afAuth.currentUser;
    return this.af.collection('contributions').add({
      ...data,
      createdBy: user.uid,
      createdAt: new Date(),
      votes: 0
    });
  }

}
