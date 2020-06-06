import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Topic } from 'src/models/topic.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  topics$: Observable<Topic[]>;
  chosenTopic: Observable<Topic>;

  constructor(private af: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.topics$ = af.collection<Topic>('topics').valueChanges().pipe(take(1));
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
  }

  showTopic(topic: Topic) {

    console.log(topic);
    this.router.navigate(['../', {title: topic.title}], {relativeTo: this.route});

  }

}
