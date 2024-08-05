"use server";

import { SignupSchema } from "@/validators/sign-up-validator";
import * as v from "valibot";
import argon2 from "argon2";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 };

export async function signupUserAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(SignupSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);

    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { name, email, password } = parsedValues.output;

  try {

    const hashedPassword = await argon2.hash(password);




    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }
}
