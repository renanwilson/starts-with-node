import express from "express";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const loginRoute = express.Router();

loginRoute.post("/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const auth = getAuth();
    const userRecord = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = auth.currentUser;
    await updateProfile(user, { displayName });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao criar usuário.");
  }
});

loginRoute.post("/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    res.status(200).json({ uid: userCredential.user });
  } catch (error) {
    console.error(error);
    res.status(401).send("Credenciais inválidas.");
  }
});

export default loginRoute;
