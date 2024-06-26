import React from "react";
import Link from "next/link";

const EmojiLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex justify-center`}>
      <Link href="/">
        <div className="quicksand text-sm text-gray-600">☕ ⌨️ ⚙️</div>
      </Link>
    </div>
  );
};

export { EmojiLogo };
