import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { Contribution } from 'src/models/contribution.model';
import { Location } from '@angular/common';
import { BackRoutingService } from './../../services/back-routing.service';

@Component({
  selector: 'app-contribute-detail',
  templateUrl: './contribute-detail.component.html',
  styleUrls: ['./contribute-detail.component.sass']
})
export class ContributeDetailComponent implements OnInit {

  contribution$: Observable<Contribution>;

  constructor(
    private route: ActivatedRoute,
    private contributionService: ContributionService,
    private router: Router,
    private brs: BackRoutingService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.contribution$ = this.contributionService.getContribution(id);
    });

    // Redirect to contribution overview if no contribution found with this ID
    this.contribution$.subscribe(contribution => {
      if (contribution === undefined) {
        this.router.navigate(['/contribute']);
      }
    });

  }

  onVote(id: string) {
    this.contributionService.submitVote(id);
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
