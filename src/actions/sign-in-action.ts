"use server";

import { signIn } from "@/auth";
import type * as v from "valibot";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 };

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
    console.error(error);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }
}
