import React, { type PropsWithChildren } from "react";

export const PullQuote = ({
  children,
  citation,
}: PropsWithChildren<{ citation?: string }>) => {
  return (
    <blockquote className="quote relative inline-block p-4 text-lg italic text-neutral-600">
      <div
        className="absolute top-0 text-6xl leading-none text-orange-400"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <div className="mx-9 mb-4 dark:text-gray-300">{children}</div>
      <div
        className="absolute bottom-0 right-7 text-6xl leading-none text-orange-400"
        aria-hidden="true"
      >
        &rdquo;
      </div>
      {citation && (
        <cite className="flex items-center justify-end">
          <span className="mb-1 text-sm font-bold italic">{citation}</span>
        </cite>
      )}
    </blockquote>
  );
};
