import { NavLink } from "react-router";

import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <div className="flex justify-around items-center mx-10 py-4 border-b border-border">
      <NavLink
        to="/"
        // className={({ isActive }) => (isActive ? "text-blue-500" : "")}
      >
        Home
      </NavLink>
      <ModeToggle />
    </div>
  );
}
