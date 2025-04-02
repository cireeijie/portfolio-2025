"use client";

import Link from "next/link";
import LogoAnimated from "./LogoAnimated";

export default function Header() {
  return (
    <header className="flex items-center max-w-[97rem] left-0 right-0 mx-auto sm:top-[4rem] top-[2rem] md:px-[2.5rem] px-[1.25rem] lg:px-0 fixed z-50 ">
      <Link href={"/"}>
        <LogoAnimated />
      </Link>
    </header>
  );
}
