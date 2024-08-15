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
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </>
  );
}

export default SignOutButton;
