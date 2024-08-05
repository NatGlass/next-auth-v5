import Link from "next/link";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <header className="h-16 border-b">
      <nav className="flex justify-between items-center h-full px-6 container">
        <Link href="/">
          <span className="font-bold text-3xl">
            Next Auth
            <span className="text-sm relative bottom-4 font-bold text-primary">
              v5
            </span>
          </span>
        </Link>
        <div className="gap-4 flex">
          <Link href="/auth/sign-in">
            <Button variant="outline">Sign in</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Sign up</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
