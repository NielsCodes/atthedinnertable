import { TopicService } from './../services/topic.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';
import { Topic } from 'src/models/topic.model';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  topics$: Observable<Topic[]>;
  chosenTopic: Observable<Topic>;

  constructor(private topicService: TopicService, private route: ActivatedRoute, private router: Router) {
    this.topics$ = this.topicService.getTopics();
  }

  ngOnInit(): void {

    this.router.events.pipe(filter(event => event instanceof RoutesRecognized)).subscribe((event: RoutesRecognized) => {
      console.log(event);
      const childRoute = event.state.root.firstChild.firstChild;

      if (childRoute !== null) {
        console.log(event.state.root.firstChild.firstChild.params.title);
      }

    });

  }

}
