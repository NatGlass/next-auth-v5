import { auth } from "@/auth";
import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import type { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

// type DatabaseUser = Omit<typeof users.$inferSelect, "password">;

async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) return <SignedOut />;

  const sessionUserId = session.user.id;

  // Way to access user info from the database
  // let databaseUser: DatabaseUser | null = null;

  // if (sessionUserId) {
  //   databaseUser = await findUserById(sessionUserId);
  //   console.log(databaseUser);
  // }

  console.log(session?.user);
  return (
    <div className="container mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-center">Profile</h1>

      <SignedIn user={session.user} />
    </div>
  );
}

export default ProfilePage;

const SignedIn = ({ user }: { user: User }) => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight text-center">
        User Information
      </h2>
      {user.image && (
        <Image src={user.image} alt={user.name || ""} width={64} height={64} />
      )}
      <table className="mt-8 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="px-6 py-3 text-start">ID</th>
            <th className="px-6 py-3 text-start">Name</th>
            <th className="px-6 py-3 text-start">Email</th>
            <th className="px-6 py-3 text-start">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="divide-x">
            <th className="px-6 py-3 text-start">{user.id}</th>
            <th className="px-6 py-3 text-start">{user.name}</th>
            <th className="px-6 py-3 text-start">{user.email}</th>
            <th className="px-6 py-3 text-start">{user.role}</th>
          </tr>
        </tbody>
      </table>
      <SignOutButton />
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight text-center">
        Not signed in
      </h2>
      <Button asChild>
        <Link href="/auth/sign-in">Sign in</Link>
      </Button>
    </>
  );
};
