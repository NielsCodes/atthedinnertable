import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.afAuth.signOut();

    const url = this.router.url;
    if (url === '/add/edit') {
      this.router.navigate(['/add']);
    }

  }

}
