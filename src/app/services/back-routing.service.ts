import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackRoutingService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(
    private router: Router
  ) {

    this.router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((routes: any[]) => {
        this.previousUrl = routes[0]?.urlAfterRedirects;
        this.currentUrl = routes[1]?.urlAfterRedirects;
      });

  }

  public initialize() { }

  public getPreviousUrl() {
    return this.currentUrl;
  }

}
