import admin from "firebase-admin";

export const authenticate = async (req, res, next) => {
  const idToken = req.headers.authorization.split(" ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "Token de autenticação ausente." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};
