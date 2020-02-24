import * as firebase from "firebase";
import { firebaseConfig, actionCodeSettings } from './../../config';

export class FirebaseClient {
  private app: firebase.app.App

  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
    }
  }

  async loginToApp(email: string) {
    return await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  }

  async isLoggedIn() {
    return await firebase.auth().currentUser;
  }

  async completeSignIn(email: string, url: string) {
    if (firebase.auth().isSignInWithEmailLink(url)) {
      try {
        return await firebase.auth().signInWithEmailLink(email, url);
      } catch (err) {
        console.log(err);
      }
    }
  }
}