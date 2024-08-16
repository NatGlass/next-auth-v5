"use client";
import { oAuthSignInAction } from "@/actions/oauth-signin-action";
import {
  SiGithub,
  SiGithubHex,
  SiGoogle,
  SiGoogleHex,
} from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";

type OAuthSignInButtonsProps = {
  signup?: boolean;
};

function OAuthSignInButtons({ signup }: OAuthSignInButtonsProps) {
  const clickHandler = async (provider: "google" | "github") => {
    await oAuthSignInAction(provider);
  };

  const text = signup ? "Sign up" : "Sign in";

  return (
    <div className="max-w-[385px] mx-auto flex gap-2 mt-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => clickHandler("google")}
      >
        <SiGoogle color={SiGoogleHex} className="mr-2" />
        {text} with Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => clickHandler("github")}
      >
        <SiGithub color={SiGithubHex} className="mr-2" />
        {text} with Github
      </Button>
    </div>
  );
}

export default OAuthSignInButtons;
