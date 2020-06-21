import { Observable } from 'rxjs';
import { ContributionService } from './../services/contribution.service';
import { Component, OnInit } from '@angular/core';
import { Contribution } from 'src/models/contribution.model';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.sass']
})
export class ContributeComponent implements OnInit {

  contributions$: Observable<Contribution[]>;

  constructor(
    private contributionService: ContributionService
  ) {
    this.contributions$ = this.contributionService.getContributions();
  }

  ngOnInit(): void {
  }

}
