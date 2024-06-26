import React from "react";

type Props = React.PropsWithChildren<{ heading: string; href: string }>;

export const ArticleHeading = ({ heading, href, children }: Props) => {
  return (
    <li className="font-medium md:border-none" key={href}>
      <a
        className={
          "my-3 block bg-gray-50 p-2 drop-shadow" +
          " text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500" +
          " dark:bg-slate-700 dark:text-gray-300 dark:visited:text-gray-300 dark:hover:text-orange-400 dark:visited:hover:text-orange-400" +
          " md:my-0 md:bg-inherit md:py-0 md:drop-shadow-none"
        }
        href={href}
        data-dismiss="modal"
      >
        <div data-dismiss="modal">{heading}</div>
      </a>
      {children}
    </li>
  );
};
