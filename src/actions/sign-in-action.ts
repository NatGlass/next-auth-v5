"use server";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 };

export async function signinUserAction(values: unknown): Promise<Res> {
  // Auth logic in NextAuth config files
  return { success: true };
}
