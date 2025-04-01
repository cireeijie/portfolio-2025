"use client";

import Link from "next/link";
import LogoAnimated from "./LogoAnimated";

export default function Header() {
  return (
    <header className="flex items-center max-w-[97rem] left-0 right-0 mx-auto top-[4rem] fixed z-50">
      <Link href={"/"}>
        <LogoAnimated />
      </Link>
    </header>
  );
}
