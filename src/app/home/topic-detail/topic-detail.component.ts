import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/models/topic.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.sass']
})
export class TopicDetailComponent implements OnInit {

  topic: Topic;

  constructor(private route: ActivatedRoute, private af: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');

      this.af.collection('topics', ref => ref.where('title', '==', title)).valueChanges().pipe(take(1)).subscribe(res => console.log(res))


    });
  }

}
