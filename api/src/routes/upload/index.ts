import * as Multer from "multer";
import { FirebaseClient } from "../../controllers/firebase";

const firebaseClient = new FirebaseClient();

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

export const uploadFile = async (req, res) => {
  try {
    const response = await firebaseClient.uploadImageToStorage(req.file);
    res.json({response});
  } catch(error) {
    res.status(500).json({error})
  }
}

export const getUploads = async (req, res) => {
  try {
    const response = await firebaseClient.getUploads();
    res.json({response});
  } catch(error) {
    res.status(500).json({error})
  }
}