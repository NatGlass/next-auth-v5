"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function oAuthSignInAction(provider: "google" | "github") {
  try {
    await signIn(provider, { redirectTo: "/profile" });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    
    console.error(error);
  }
}
