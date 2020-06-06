import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  $topics: Observable<any[]>;
  constructor(af: AngularFirestore) {
    this.$topics = af.collection('topics').valueChanges().pipe(take(1));
  }

  ngOnInit(): void {
  }

}
