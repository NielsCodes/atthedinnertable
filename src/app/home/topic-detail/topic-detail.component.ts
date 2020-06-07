import { TopicService } from './../../services/topic.service';
import { take, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/models/topic.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.sass']
})
export class TopicDetailComponent implements OnInit {

  topic$: Observable<Topic>;

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');

      this.topic$ = this.topicService.getTopic(title);

    });

  }

}
