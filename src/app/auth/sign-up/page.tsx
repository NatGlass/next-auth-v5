import Link from "next/link";
import SignUpForm from "./_components/sign-up-form";

function SignUpPage() {
  return (
    <div className="container mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-center">Sign Up</h1>
      <SignUpForm />
      <div className="text-center mt-2">
        <p>
          Already have an account?{" "}
          <span className="text-primary underline">
            <Link href="/auth/sign-in">Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
