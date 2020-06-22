import { BackRoutingService } from './../../services/back-routing.service';
import { TopicService } from './../../services/topic.service';
import { take, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/models/topic.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.sass'],
})
export class TopicDetailComponent implements OnInit {

  topic$: Observable<Topic>;

  animationState = 'out';

  isShowSources = true;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private router: Router,
    private brs: BackRoutingService,
    private location: Location
  ) {  }

  toggleSources(divName: string) {
    if (divName === 'sources') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url = params.get('url');

      this.topic$ = this.topicService.getTopicByURL(url);

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

  onNavigateBack() {

    const previousUrl = this.brs.getPreviousUrl();

    if (previousUrl === undefined) {
      this.router.navigate(['/']);
    } else {
      this.location.back();
    }

  }

}
