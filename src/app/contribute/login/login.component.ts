import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {

    this.afAuth.authState.subscribe(state => {
      if (state !== null) {
        this.router.navigate(['/contribute/edit']);
      }
    });

  }

  ngOnInit(): void {
  }

}
