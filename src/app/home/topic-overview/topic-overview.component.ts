import { Component, OnInit, Input } from '@angular/core';
import { Topic } from 'src/models/topic.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topic-overview',
  templateUrl: './topic-overview.component.html',
  styleUrls: ['./topic-overview.component.sass']
})
export class TopicOverviewComponent implements OnInit {

  @Input() topics$: Observable<Topic[]>;

  constructor() {
  }

  ngOnInit(): void {

  }

}
