import { FirebaseClient } from "./../controllers/firebase";

const firebaseClient = new FirebaseClient();

export const updateUser = async (req, res) => {
  const { user } = req.body;
  try {
    const response = await firebaseClient.updateUser(user);
    res.json({response});
  } catch(error) {
    res.status(500).json({error})
  }
}