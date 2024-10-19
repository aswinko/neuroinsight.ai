"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/src/lib/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const getUserByEmail = async (email: string) => {
  try {
    // const user = await db.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });

    // return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: "USER",
    redirectTo: "/",
  };
  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser);

  try {
    const result = await signIn("credentials", {
      redirect: false, // Don't redirect immediately
      email: rawFormData.email,
      password: rawFormData.password,
      callbackUrl: rawFormData.redirectTo,
    });

    if (!result?.ok) {
      return { error: "Invalid credentials!" };
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  revalidatePath("/");
};
