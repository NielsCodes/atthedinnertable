import { topicDetailAnimation } from './../route-animations';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { ContributionService } from './../services/contribution.service';
import { Component, OnInit } from '@angular/core';
import { Contribution } from 'src/models/contribution.model';
import { Title } from '@angular/platform-browser';
import { filter, first, map } from 'rxjs/operators';
import { topicListAnimation } from '../route-animations';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.sass'],
  animations: [
    topicListAnimation,
    topicDetailAnimation
  ]
})
export class ContributeComponent implements OnInit {

  contributions$: Observable<Contribution[]>;
  chosenContributionID: string;

  windowWidth: number;
  viewState: string;
  state: string;

  defaultTitle = 'At The Dinner Table - Some discussions can\'t wait';

  constructor(
    private contributionService: ContributionService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.contributions$ = this.contributionService.getContributions();
  }

  ngOnInit(): void {

    // On first load: check for title parameter
    let routeChild = this.route.snapshot.firstChild;
    if (routeChild === null) {
      this.title.setTitle(this.defaultTitle);
      this.chosenContributionID = undefined;
      this.state = 'root';
      this.setState();
    } else {
      this.state = 'detail';
      this.setState();
      const id = routeChild.params.id;

      this.contributionService.getContribution(id)
        .pipe(
          first(),
          map(contribution => contribution.type)
          )
        .toPromise().then(title => {
          this.title.setTitle(title);
        });

      this.chosenContributionID = id;
    }

    // Subsequent loads are subscribed to
    this.router.events.pipe(filter(event => event instanceof RoutesRecognized)).subscribe((event: RoutesRecognized) => {
      routeChild = event.state.root.firstChild.firstChild.firstChild;

      if (routeChild === null) {
        this.title.setTitle(this.defaultTitle);
        this.chosenContributionID = undefined;
        this.state = 'root';
        this.setState();
      } else {
        this.state = 'detail';
        this.setState();
        const id = routeChild.params.id;

        console.log(`id: ${id}`);

        this.contributionService.getContribution(id)
          .pipe(
            first(),
            map(contribution => contribution.type)
            )
          .toPromise().then(title => {
            this.title.setTitle(title);
          });

        this.chosenContributionID = id;
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
