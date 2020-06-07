import { TopicService } from './../services/topic.service';
import { Component, OnInit } from '@angular/core';
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
  chosenTopic: Observable<Topic>;

  constructor(private topicService: TopicService) {
    this.topics$ = this.topicService.getTopics();
  }

  ngOnInit(): void { }

}
