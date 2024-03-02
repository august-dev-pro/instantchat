// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import { authConfig } from "../../../auth.config";
import credentials from "next-auth/providers/credentials";
import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { parseCookies, setCookie } from "nookies";

//fu=onction de verification de l'existance de l'email dans la bd
async function getUser(client: any, email: string) {
  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("Résultat de la requête:", user.rows); // Affiche les lignes retournées par la requête
    return user.rows[0];
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials, request) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Validez les informations d'identification ici si nécessaire
        const client = await db.connect();
        const user = await getUser(client, email);

        if (!user || !bcrypt.compare(password, user.password)) {
          return null; // Renvoyer null si les informations d'identification sont invalides
        }

        console.log("user get id is  ID:", user.id);
        //await signIn("credentials", { ...user });

        setCookie(null, "user_id", user.id, {
          maxAge: 30 * 24 * 60 * 60, // 30 jours
          path: "/", // Chemin sur lequel le cookie est disponible
        });

        // Récupérer les cookies de la requête
        const cookies = parseCookies({ req: request });

        console.log(`cookies are: `, cookies);

        return user; // Renvoyer l'utilisateur si l'authentification réussit
      },
    }),
  ],
});
