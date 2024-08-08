"use client";

import { signoutUserAction } from "@/actions/sign-out-user-action";
import { Button } from "./ui/button";

function SignOutButton() {
  const handleSignOut = async () => {
    await signoutUserAction();

    window.location.href = "/";
  };
  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleSignOut}
        className="mt-8"
      >
        Sign Out
      </Button>
    </>
  );
}

export default SignOutButton;
