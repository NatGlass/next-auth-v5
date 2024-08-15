import Link from "next/link";
import SignInForm from "./_components/sign-in-form";
import OAuthSignInButtons from "@/components/oauth-sign-in-buttons";

function SignInPage() {
  return (
    <div className="container mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-center">Sign In</h1>
      <SignInForm />
      <OAuthSignInButtons />
      <div className="text-center mt-2">
        <p>
          Don&apos;t have an account?{" "}
          <span className="text-primary underline">
            <Link href="/auth/sign-up">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
