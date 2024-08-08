"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import type * as v from "valibot";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 | 401 };

export async function signinUserAction(values: unknown): Promise<Res> {
  try {
    if (
      typeof values !== "object" ||
      values === null ||
      Array.isArray(values)
    ) {
      throw new Error("Invalid JSON object");
    }
    
    await signIn("credentials", { ...values, redirect: false });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          case "CallbackRouteError": {
            return { success: false, error: "Invalid email or password", statusCode: 401 };
          }
          default: {
            return { success: false, error: "Something went wrong", statusCode: 500 };
          }
      }
    }
    console.error(error);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }
}
