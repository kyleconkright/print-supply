import { Request, Response } from "express";
import { FirebaseClient } from "./../controllers/firebase";
import { Storage } from '@google-cloud/storage';
import * as multer from "multer";

const firebaseClient = new FirebaseClient()

export class Routes {
  public routes(app: any) {
    app.get('/', (req: Request, res: Response) => {
      try {
        firebaseClient.isLoggedIn()
          .then(response => {
            return res.json({response});
          })
          .catch();
      } catch (err) {
        console.log(err);
      }
    })

    app.post('/login', (req: Request, res: Response) => {
      const { email } = req.body;
      try {
        res.send(firebaseClient.login(email));
      } catch (error) {
        console.log(error)
      }
    })
   
    app.post('/logout', (req: Request, res: Response) => {
      try {
        res.send(firebaseClient.logout());
      } catch (error) {
        console.log(error)
      }
    })

    app.post('/complete', async (req: Request, res: Response) => {
      const { url, email } = req.body;
      try {
        const user = await firebaseClient.completeSignIn(email, url)
        res.json({user});
      } catch (err) {
        console.log(err);
      }
    })

    const m = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
      }
    });


    const projectId = process.env.GOOGLE_PROJECT_ID;
    const keyFilename = './../api/other-print-supply-firebase-adminsdk-zahw7-332ad7ec65.json';
    const storage = new Storage({ projectId, keyFilename });
    const bucket = storage.bucket("other-print-supply.appspot.com");

    app.post('/upload', m.single('file'), async (req, res, next) => {
      // try {
      //   const file = req.file
      //   const url = await firebaseClient.upload(file)
      //   res.json({
      //     message: "Upload was successful",
      //     data: url
      //   })  
      // } catch(err) {
      //   console.error(err);
      // }

      const file = req.files.file;
      const uid = (await firebaseClient.isLoggedIn()).uid;

      console.log(file);

      const { name, mimetype, buffer } = file

      const blob = bucket.file(Date.now() + name);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: mimetype
        }
      })
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uid}/${blob.name}`;

        blob.makePublic().then(() => {
          res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
        });
      })
        .on('error', () => {
          console.error(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
    })
  }
}
