import { getAuth } from "firebase-admin/auth";

export const authenticate = async (req, res, next) => {
  try {
    const idToken = req?.headers?.authorization?.split(" ")[1];
    const auth = getAuth();
    if (!idToken) {
      return res.status(401).json({ error: "Token de autenticação ausente." });
    }

    const decodedToken = await auth.verifyIdToken(idToken).catch(() => {
      return res.status(401).json({ error: "Token de autenticação inválido." });
    });

    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};
