"use client";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignOutButton from "./sign-out-button";
import { Button } from "./ui/button";

function NavLinks() {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <Loading />;

    case "unauthenticated":
      return <SignedOut />;

    case "authenticated":
      return <SignedIn />;

    default:
      return null;
  }
}

export default NavLinks;

const Loading = () => {
  return (
    <Button variant="ghost">
      Loading...
      <Loader2Icon className="w-4 h-4 animate-spin ml-2" />
    </Button>
  );
};

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
