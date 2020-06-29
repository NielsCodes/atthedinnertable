import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-menu',
  templateUrl: './share-menu.component.html',
  styleUrls: ['./share-menu.component.sass']
})
export class ShareMenuComponent implements OnInit {

  constructor(
    private router: Router
  ) {  }

  shareData = {
    url: this.router.url
  };

  ngOnInit(): void {
    console.log(this.shareData);
  }

  // onShare(title: string, url: string) {

  //   const shareData = {
  //     title: 'At The Dinner Table',
  //     text: title,
  //     url: this.router.url
  //   };
  // }

}
