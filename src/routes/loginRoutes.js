import express from "express";
import admin from "firebase-admin";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginRoute = express.Router();

loginRoute.post("/createUser", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(500).send("Erro ao criar usuário.");
  }
});

// Endpoint para autenticar um usuário
loginRoute.post("/authenticateUser", async (req, res) => {
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
