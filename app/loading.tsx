"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to change the state after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Preloader /> : null; // Display Preloader for 2 seconds
}
