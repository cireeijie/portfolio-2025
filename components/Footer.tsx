import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="relative flex lg:flex-row flex-col items-center justify-between max-w-[97rem] py-10 text-sm border-t border-gray-700 gap-[1rem] mx-auto transition-all font-light mt-[5vh]">
      <div>
        © {new Date().getFullYear()} <Link href="/">Eric John</Link>. All rights
        reserved
      </div>
      <div className="flex gap-4">
        <Link
          href="https://www.linkedin.com/in/eric-john-ariate-278a02243/"
          target="_blank"
        >
          LinkedIn
        </Link>
        <Link href="https://github.com/cireeijie" target="_blank">
          GitHub
        </Link>
        <Link href="https://www.facebook.com/cire.eijie" target="_blank">
          Facebook
        </Link>
        <Link href="https://www.instagram.com/eijiecire/" target="_blank">
          Instagram
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCwzWxvqIKFxuUk3XmihmC7A"
          target="_blank"
        >
          YouTube
        </Link>
      </div>
    </div>
  );
}
