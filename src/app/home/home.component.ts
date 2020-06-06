import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Topic } from 'src/models/topic.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  topics$: Observable<Topic[]>;
  constructor(af: AngularFirestore) {
    this.topics$ = af.collection<Topic>('topics').valueChanges().pipe(take(1));
  }

  ngOnInit(): void {
  }

}
