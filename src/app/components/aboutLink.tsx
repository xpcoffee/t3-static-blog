import React from "react";
import Link from "next/link";

const AboutLink = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} quicksand text-xl`}>
      <Link
        href="/about"
        className="text-gray-600 visited:text-gray-600 dark:text-gray-200 dark:visited:text-gray-200"
      >
        About me
      </Link>
    </div>
  );
};

export { AboutLink };
