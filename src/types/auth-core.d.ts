import type { users } from "@/drizzle/schema";
import type { AdapterUser as NextAuthAdapterUser } from "next-auth/adapters";

declare module "@auth/core/adapters" {
  export interface AdapterUser extends NextAuthAdapterUser {
    role: (typeof users.$inferSelect)["role"];
  }
}
