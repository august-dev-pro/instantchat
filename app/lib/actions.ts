"use server";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { destroyCookie, setCookie } from "nookies";
import { signIn, signOut } from "../api/auth/[...nextAuth]";
const bcrypt = require("bcrypt");

// Fonction pour crypter un mot de passe
async function encryptPassword(password: string, saltRounds: number) {
  try {
    // Générer un sel pour le hachage
    const salt = await bcrypt.genSalt(saltRounds);
    // Hacher le mot de passe avec le sel généré
    const hash = await bcrypt.hash(password, saltRounds);
    return hash; // Retourner le mot de passe haché
  } catch (err) {
    console.error("Erreur lors du hachage du mot de passe :", err);
    throw err; // Gérer l'erreur ou la propager
  }
}

const FormSchema = z.object({
  id: z.string(),
  userName: z.string({
    invalid_type_error: "Veuillez entrer un Nom d'utilisateur valide",
  }),
  email: z.string({
    invalid_type_error: "Veuillez entrer une adresse e-mail valide.",
  }),
  password: z.string({
    invalid_type_error: "Veuillez entrer un mot de passe valide.",
  }),
});

export type State = {
  errors?: {
    userId?: string[];
    name?: string[];
    surName?: string[];
    email?: string[];
    userName?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type useFormState = {
  errors?: {
    validatedFields?: string[];
  };
  message?: "Missing Fields. Failed to Create Invoice.";
};

const CreateUser = FormSchema.omit({ id: true });
export async function registerUser(prevState: State, formData: FormData) {
  console.log("registering user now...");

  const validatedFields = CreateUser.safeParse({
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Check if validation succeeded
  if (!validatedFields.success) {
    // Validation failed, handle errors
    console.log(`error to the registing ${validatedFields.error}`);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Data is valid
  const { userName, email, password } = validatedFields.data;

  // Proceed with further actions, e.g., sending data to server

  console.log(validatedFields.data);

  // Le nombre de salage (recommandé : 10)
  //const saltRounds = 5;
  //const passwordHash = await encryptPassword(password, saltRounds);

  try {
    //insertion dans la BD
    await sql`INSERT INTO users(userName, email, password)
    VALUES (${userName}, ${email}, ${password}) `;
    console.log("user is register");
  } catch (error) {
    return {
      errorMessage: `erreur lors de l'enregistrement du User: ${error}`,
    };
  }
  revalidatePath("/register");
  //console.log("user is register");
  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut();
    destroyCookie(null, "user_id");
    redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      return "logOut false";
    }
    throw error;
  }
}
