import { Request, Response } from "express";
import { FirebaseClient } from "./../controllers/firebase";
import { multer, uploadFile, getUploads } from "./upload";
import axios from 'axios';
import * as btoa from 'btoa';

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
    
    app.post('/upload', multer.single('file'), uploadFile);
    app.get('/uploads', getUploads);

    app.post('/get-quote', async (req, res) => {
      var username = 'user';
      var password = process.env.SCALABLE_PRESS_KEY;

      
      
      let design;

      try {
        const body = {
          type: 'dtg',
          sides: {
            front: {
              artwork: req.body.url,
              resize: true,
              dimensions: {
                width: 5
              },
              position: {
                horizontal: "C",
                offset: {
                  top: 2.5
                }
              },
            }
          },
          products: [
            {
              id: 'gildan-sweatshirt-crew',
              color: 'ash',
              quantity: 1,
              size: 'lrg'
            }
          ]
        }  
        design = (await axios.post('https://api.scalablepress.com/v2/design', body, {auth: { username, password }})).data;
        console.log(design);
      } catch(err) {
        res.json(err.response.data.issues);
      }

      

      try {
        const body = {
          type: 'dtg',
          designId: design.id,
        }
        const quote = await axios.post('https://api.scalablepress.com/v2/quote', body, {auth: { username, password }});
        console.log(quote);
        res.json(quote);
      } catch(err) {
        console.error(err);
        res.json(err);
      }
    });
  }
}
