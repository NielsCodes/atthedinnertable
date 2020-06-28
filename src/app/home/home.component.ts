import { Title } from '@angular/platform-browser';
import { TopicService } from './../services/topic.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Topic } from 'src/models/topic.model';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

import { topicListAnimation, topicDetailAnimation } from '../route-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    topicListAnimation,
    topicDetailAnimation
  ]
})
export class HomeComponent implements OnInit {

  viewState: string;
  state: string;
  topics$: Observable<Topic[]>;
  chosenTopicURL: string;
  windowWidth: number;

  defaultTitle = 'At The Dinner Table - Some discussions can\'t wait';

  // Watch viewport size for animations
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.windowWidth = window.innerWidth;
    this.setState();
  }

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) {
    this.topics$ = this.topicService.getTopics();
    this.onResize();
  }

  ngOnInit(): void {

    // On first load: check for title parameter
    let routeChild = this.route.snapshot.firstChild;
    if (routeChild === null) {
      this.title.setTitle(this.defaultTitle);
      this.chosenTopicURL = undefined;
      this.state = 'root';
      this.setState();
    } else {
      this.state = 'detail';
      this.setState();
      const url = routeChild.params.url;

      this.topicService.getTopicByURL(url)
        .pipe(
          first(),
          map(topic => topic.title)
          )
        .toPromise().then(title => {
          this.title.setTitle(title);
        });

      this.chosenTopicURL = url;
    }

    // Subsequent loads are subscribed to
    this.router.events.pipe(filter(event => event instanceof RoutesRecognized)).subscribe((event: RoutesRecognized) => {
      routeChild = event.state.root.firstChild.firstChild;

      if (routeChild === null) {
        this.title.setTitle(this.defaultTitle);
        this.chosenTopicURL = undefined;
        this.state = 'root';
        this.setState();
      } else {
        this.state = 'detail';
        this.setState();
        const url = routeChild.params.url;

        this.topicService.getTopicByURL(url)
          .pipe(
            first(),
            map(topic => topic.title)
            )
          .toPromise().then(title => {
            this.title.setTitle(title);
          });

        this.chosenTopicURL = url;
      }

    });

  }

  setState() {

    const width = this.windowWidth;
    const state = this.state;

    const mobileCutfoff = 1100;

    if ( width > mobileCutfoff ) {
      this.viewState = 'desktop';
    } else {
      this.viewState = state;
    }

  }

}
