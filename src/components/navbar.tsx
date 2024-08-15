import Link from "next/link";
import NavLinks from "./nav-links";

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
        <div className="flex items-center h-full">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
