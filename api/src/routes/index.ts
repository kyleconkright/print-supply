import { Request, Response } from "express";
import { FirebaseClient } from "./../controllers/firebase";
import axios from 'axios';
import { multer, uploadFile, getUploads } from "./upload";
import { updateUser } from "./user";

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
        console.error(err.response.data)
      }
    })

    app.post('/login', (req: Request, res: Response) => {
      const { email } = req.body;
      try {
        res.send(firebaseClient.login(email));
      } catch (error) {
        console.error(error.response.data)
      }
    })
   
    app.post('/logout', (req: Request, res: Response) => {
      try {
        res.send(firebaseClient.logout());
      } catch (error) {
        console.error(error.response.data)
      }
    })

    app.post('/user/update', updateUser);

    app.post('/complete', async (req: Request, res: Response) => {
      const { url, email } = req.body;
      try {
        const user = await firebaseClient.completeSignIn(email, url)
        res.json({user});
      } catch (err) {
        console.error(err.response.data)
      }
    })

    app.get('/products', async (req: Request, res: Response) => {
      try {
        const products = await firebaseClient.getProducts();
        res.send(products);
      } catch(err) {
        console.log(err);
      }
    });
    
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
