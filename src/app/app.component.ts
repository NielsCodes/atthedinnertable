import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/performance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {

    // Initiate firebase performance monitoring
    const perf = firebase.performance();

  }
}
