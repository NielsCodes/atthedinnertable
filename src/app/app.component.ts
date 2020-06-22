import { BackRoutingService } from './services/back-routing.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    private brs: BackRoutingService
  ) {
    console.log('app running');
    this.brs.initialize();
  }

}
