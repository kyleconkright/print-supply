import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { firebaseConfig, actionCodeSettings } from './../../config';
import { Storage } from '@google-cloud/storage';
import { format } from "url"
import { userInfo } from 'os';

const keyFilename = './../api/other-print-supply-1df0fa2b6e7c.json';

export class FirebaseClient {
  private app: firebase.app.App;
  private db: firebase.firestore.Firestore;

  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
      this.db = this.app.firestore();
    }  else {
      this.db = firebase.firestore();
    }
  }

  async login(email: string) {
    return await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  }
  
  async logout() {
    return await firebase.auth().signOut();
  }

  async isLoggedIn() {
    const user =  await firebase.auth().currentUser;
    const more = await (await this.db.collection('users').doc('uvaVF191sEYpHkuX5iMRQ8HyqDg1').get()).data();
    try {
      const all = await Promise.all([user, more]);
      return all;
    } catch(err) {
      console.error(err);
    }
  }
  
  async updateUser(user) {
    const currentUser = await firebase.auth().currentUser;
    try {
      const {address, ...userData} = user;
      const {displayName, email, ...dump} = userData;
      const updatedUser: any = await firebase.auth().currentUser.updateProfile(userData);
      try {
        return await this.db.collection('users').doc(currentUser.uid).set({displayName, email, address});
      } catch(err) {
        console.error(err);
      }
      return updatedUser;
    } catch(err) {
      console.error(err);
    }
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

  async uploadImageToStorage(file: any) {
    const projectId = process.env.GOOGLE_PROJECT_ID;
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

  async getUploads() {
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const storage = new Storage({ projectId, keyFilename });
    const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);
    let user;

    try {
      user = await this.isLoggedIn();
    } catch(err) {console.error(err)}

    const files = await bucket.getFiles({prefix: `${user.uid}`});
    return files;
  }

  async addProductsToFirebase(data) {
    this.db.collection('/products').doc(data.productId).set(data);
  }
  
  async getProducts() {
    const results = (await this.db.collection('/products').doc('test-print-001').get()).data();
    console.log(results);
    return results;
  }
}

function formatUserFromApi(user) {
  return {
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    emailVerified: user.emailVerified,
  }
}