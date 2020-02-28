import * as firebase from "firebase";
import { firebaseConfig, actionCodeSettings } from './../../config';
import { Storage } from '@google-cloud/storage';
import { format } from "url";

export class FirebaseClient {
  private app: firebase.app.App


  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
    }
  }
  
  async upload(file) {
    try {
      await uploadImage(file)
    } catch (err) {
      console.error(err);
    }
  };


  async login(email: string) {
    return await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  }
  
  async logout() {
    return await firebase.auth().signOut();
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

// const projectId = process.env.GOOGLE_PROJECT_ID;
// const keyFilename = './../api/other-print-supply-firebase-adminsdk-zahw7-332ad7ec65.json';
// const storage = new Storage({ projectId, keyFilename });
// const bucket = storage.bucket("other-print-supply.appspot.com");

// export const uploadImage = (file) => new Promise((resolve, reject) => {
//   const { originalname, mimetype, buffer } = file

//   const blob = bucket.file(Date.now() + originalname);
//   const blobStream = blob.createWriteStream({
//     resumable: false,
//     metadata: {
//       contentType: mimetype
//     }
//   })
//   blobStream.on('finish', () => {
//     const publicUrl = format(
//       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//     )
//     resolve(publicUrl)
//   })
//   .on('error', () => {
//     reject(`Unable to upload image, something went wrong`)
//   })
//   .end(buffer)
// })
