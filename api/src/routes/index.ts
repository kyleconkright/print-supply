import { Request, Response } from "express";
import { FirebaseClient } from "./../controllers/firebase";
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

    const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
      }
    });
    
    app.post('/upload', upload.single('file'), async (req, res) => {
      try {
        const response = await firebaseClient.uploadImageToStorage(req.file);
        res.json({response});
      } catch(error) {
        res.status(500).json({error})
      }
    })
  }
}
