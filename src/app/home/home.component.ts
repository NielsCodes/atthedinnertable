import { Title } from '@angular/platform-browser';
import { TopicService } from './../services/topic.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Topic } from 'src/models/topic.model';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  topics$: Observable<Topic[]>;
  chosenTopicURL: string;

  defaultTitle = 'At The Dinner Table - Some discussions can\'t wait';

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) {
    this.topics$ = this.topicService.getTopics();
  }

  ngOnInit(): void {

    // On first load: check for title parameter
    const routeChild = this.route.snapshot.firstChild;
    if (routeChild === null) {
      this.title.setTitle(this.defaultTitle);
      this.chosenTopicURL = undefined;
    } else {
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
      const childRoute = event.state.root.firstChild.firstChild;

      if (childRoute === null) {
        this.title.setTitle(this.defaultTitle);
        this.chosenTopicURL = undefined;
      } else {
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

}
