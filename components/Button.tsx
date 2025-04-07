import React from "react";
import { ButtonProps } from "../constants/types";
import Link from "next/link";

export default function Button({
  text,
  variant = "primary",
  href = "/",
  onClick,
}: ButtonProps) {
  const buttonClasses = `btn lg:w-fit w-full cursor-pointer uppercase text-[1rem] px-4 py-2 font-bold rounded transition-all duration-300 
    ${variant === "primary" ? "btn-primary" : "btn-secondary"}`;

  return href !== "" ? (
    <Link href={href} className={buttonClasses} onClick={onClick}>
      <span className="z-10">{text}</span>
    </Link>
  ) : (
    <button className={buttonClasses} onClick={onClick}>
      <span className="z-10">{text}</span>
    </button>
  );
}
