import React from "react";
import Link from "next/link";

const Title = ({
  titleText,
  className,
}: {
  titleText: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} text-gray-600 visited:text-gray-600 dark:text-gray-200 dark:visited:text-gray-200`}
    >
      <Link href="/">
        <div className="flex items-center">
          <div className="quicksand ml-2 text-2xl text-gray-700 dark:ml-3 dark:text-gray-200">
            {titleText}
          </div>
        </div>
      </Link>
    </div>
  );
};

export { Title };
