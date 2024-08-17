import db from "@/drizzle";
import "server-only";

import { lower, users } from "@/drizzle/schema";
import { eq, getTableColumns } from "drizzle-orm";

export const findUserByEmail = async (
  email: string
): Promise<typeof users.$inferSelect | null> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()))
    .then((res) => res[0] ?? null);

  return user;
};

export const findUserById = async (
  id: string
): Promise<Omit<typeof users.$inferSelect, "password">> => {
  const {password, ...userWithoutPassword} = getTableColumns(users);

  const user = await db
    .select(userWithoutPassword)
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0] ?? null);

  if (!user) throw new Error("User not found");

  return user;
};
