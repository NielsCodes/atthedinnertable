import { TopicService } from './../../services/topic.service';
import { take, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/models/topic.model';
import { Observable } from 'rxjs';

import { sourcesAnimation } from '../../animations/sourcesAnimation';

declare let sharded: any;

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.sass'],
  animations: [sourcesAnimation]
})
export class TopicDetailComponent implements OnInit {

  topic$: Observable<Topic>;

  animationState = 'out';

  // isShowSources = true;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private router: Router
  ) {  }

  toggleSources(divName: string) {
    if (divName === 'sources') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');

      this.topic$ = this.topicService.getTopic(title);

    });

    this.topic$.subscribe(topic => {
      // Navigate to root if topic not found
      if (topic === undefined) {
        this.router.navigate(['/']);
      }
    });

  }

  onVote(id: string) {

    this.topicService.submitVote(id);

  }

}
