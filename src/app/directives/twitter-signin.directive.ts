import { Directive, Host, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Directive({
  selector: '[appTwitterSignin]'
})
export class TwitterSigninDirective {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  @HostListener('click')
  onClick() {
    this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

}
