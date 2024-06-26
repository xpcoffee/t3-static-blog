import React from "react";
import Link from "next/link";

const Title = ({
  titleText,
  iconUrl,
  className,
}: {
  titleText: string;
  iconUrl?: string | null;
  className?: string;
}) => {
  return (
    <div
      className={`${className} text-gray-600 visited:text-gray-600 dark:text-gray-200 dark:visited:text-gray-200`}
    >
      <Link href="/">
        <div className="flex items-center">
          <img
            className="dark:rounded-full dark:border-2 dark:border-slate-300"
            alt="xpcoffee icon"
            style={{ height: "45px" }}
            src={iconUrl ?? undefined}
          />
          <div className="quicksand ml-2 text-2xl text-gray-700 dark:ml-3 dark:text-gray-200">
            {titleText}
          </div>
        </div>
      </Link>
    </div>
  );
};

export { Title };
