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

  async uploadImageToStorage (file: any) {
    
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const keyFilename = './../api/other-print-supply-1df0fa2b6e7c.json';
    const storage = new Storage({ projectId, keyFilename });
    const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);
    let user;
    
    return await new Promise(async (resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      try {
        user = await this.isLoggedIn();
        if (!user) return reject('you must log in');
      } catch(err) {
        reject(err);
        return;
      }
      const newFileName = `${Date.now()}__${file.originalname}`;
      const fileUpload = bucket.file(`${user.uid}/${newFileName}`);
  
      const blobStream = fileUpload.createWriteStream({
        gzip: true,
        resumable: false,
        metadata: {
          contentType: file.mimetype
        }
      });
  
      blobStream.on('error', (error) => {
        reject('Something is wrong! Unable to upload at the moment.');
      });
  
      blobStream.on('finish', async () => {
        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        await fileUpload.makePublic();
        resolve(url);
      });
  
      blobStream.end(file.buffer);
    });
  }
}
