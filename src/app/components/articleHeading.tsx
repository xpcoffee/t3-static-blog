import React from "react"

type Props = React.PropsWithChildren<{ heading: string; href: string }>

export const ArticleHeading = ({ heading, href, children }: Props) => {
  return (
    <li className="font-medium md:border-none" key={href}>
      <a
        className={
          "block p-2 my-3 bg-gray-50 drop-shadow" +
          " text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500" +
          " dark:text-gray-300 dark:visited:text-gray-300 dark:bg-slate-700 dark:hover:text-orange-400 dark:visited:hover:text-orange-400" +
          " md:my-0 md:bg-inherit md:drop-shadow-none md:py-0"
        }
        href={href}
        data-dismiss="modal"
      >
        <div data-dismiss="modal">{heading}</div>
      </a>
      {children}
    </li>
  )
}
