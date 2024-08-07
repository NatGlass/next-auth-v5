"use server";

import db from "@/drizzle";
import { lower, users } from "@/drizzle/schema";
import { SignupSchema } from "@/validators/sign-up-validator";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import * as v from "valibot";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 | 409 };

export async function signupUserAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(SignupSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);

    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { name, email, password } = parsedValues.output;

  try {
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(lower(users.email), email.toLowerCase()))
      .then((res) => res[0] ?? null);

    if (existingUser?.id) {
      return { success: false, error: "User already exists", statusCode: 409 };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }

  try {
    const hashedPassword = await argon2.hash(password);

    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id })
      .then((res) => res?.[0]);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error", statusCode: 500 };
  }
}
