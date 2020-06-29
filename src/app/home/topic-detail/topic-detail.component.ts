import { BackRoutingService } from './../../services/back-routing.service';
import { TopicService } from './../../services/topic.service';
import { take, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/models/topic.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareMenuComponent } from './share-menu/share-menu.component';

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
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private topicService: TopicService,
    private router: Router,
    private brs: BackRoutingService,
    private location: Location,
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

  onShare(title: string, url: string) {

    const nav: any = window.navigator;

    const shareData = {
      title: 'At The Dinner Table',
      text: title,
      url: this.router.url
    };

    if (nav && nav.share) {

      nav.share(shareData);

    } else {
        // Show type info dialog
        this.dialog.open(ShareMenuComponent, {
          width: '400px'
        });
    }
  }

}
