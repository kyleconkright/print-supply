import { Request, Response } from "express";
import { FirebaseClient } from "./../controllers/firebase";

const firebaseClient = new FirebaseClient()

export class Routes {
  public routes(app: any) {
    app.get('/', (req: Request, res: Response) => {
      try {
        firebaseClient.isLoggedIn()
          .then(response => res.send(response))
          .catch();
      } catch (err) {
        console.log(err);
      }
    })

    app.post('/login', (req: Request, res: Response) => {

      const { email } = req.body;

      try {
        res.send(firebaseClient.loginToApp(email));
      } catch (error) {
        console.log(error)
      }
    })

    app.post('/complete', (req: Request, res: Response) => {

      const { url, email } = req.body;

      try {
        firebaseClient.completeSignIn(email, url)
          .then(response => res.send(response.user))
          .catch()
      } catch (err) {
        console.log(err);
      }
    })
  }
}