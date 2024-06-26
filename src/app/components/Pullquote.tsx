import React, { PropsWithChildren } from "react"

export const PullQuote = ({
  children,
  citation,
}: PropsWithChildren<{ citation?: string }>) => {
  return (
    <blockquote className="inline-block relative p-4 text-lg italic text-neutral-600 quote">
      <div
        className="text-6xl text-orange-400 absolute top-0 leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <div className="mb-4 mx-9 dark:text-gray-300">{children}</div>
      <div
        className="text-6xl text-orange-400 absolute bottom-0 right-7 leading-none"
        aria-hidden="true"
      >
        &rdquo;
      </div>
      {citation && (
        <cite className="flex items-center justify-end">
          <span className="mb-1 text-sm italic font-bold">{citation}</span>
        </cite>
      )}
    </blockquote>
  )
}
