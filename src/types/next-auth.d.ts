import type { users } from "@/drizzle/schema";
import type { User as NextAuthUser } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends NextAuthUser {
    role: (typeof users.$inferSelect)["role"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: (typeof users.$inferSelect)["id"];
    role: (typeof users.$inferSelect)["role"];
  }
}
