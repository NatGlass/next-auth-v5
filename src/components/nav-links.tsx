import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "./sign-out-button";
import { Button } from "./ui/button";

async function NavLinks() {
  const session = await auth();

  if (!session || !session.user) return <SignedOut />;

  return <SignedIn />;
}

export default NavLinks;

const SignedIn = () => {
  return (
    <div className="gap-4 flex items-center">
      <Button asChild>
        <Link href="/profile">Profile</Link>
      </Button>
      <SignOutButton />
    </div>
  );
};

const SignedOut = () => {
  return (
    <div className="gap-4 flex items-center">
      <Link href="/auth/sign-in">
        <Button variant="outline">Sign in</Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
};
