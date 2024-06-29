import React from "react";
import Link from "next/link";
import { getIcon } from "~/utils/fontAwesome";

interface Props {
  articlePath: string;
  title?: string;
  description?: string;
  faIconName?: string;
  lastEdit?: Date;
}

const ArticleListItem = ({
  articlePath,
  title,
  description,
  faIconName,
  lastEdit,
}: Props) => {
  const icon = getIcon(faIconName) ?? <></>;

  const descriptionSubtext = description ? (
    <span className="text-sm text-gray-600 dark:text-gray-400">
      {description}
    </span>
  ) : undefined;

  const lastEditSubtext = lastEdit ? (
    <span className="text-sm text-gray-600 dark:text-gray-400">
      Last edit: {`${lastEdit.toString()}`}
    </span>
  ) : undefined;

  return (
    <li>
      <Link
        tabIndex={0}
        className={
          "my-2 block py-3 pl-5" +
          " md:my-2 md:border-0 md:bg-inherit md:pb-0 md:pt-1" +
          " bg-gray-50 text-indigo-800 visited:text-indigo-800 hover:text-orange-400 visited:hover:text-orange-400" +
          " dark:bg-slate-700 dark:text-slate-200 dark:visited:text-slate-200 dark:hover:text-orange-400"
        }
        href={`/articles/${articlePath}`}
      >
        <div className="flex flex-col">
          <div className="font-serif">
            {icon}
            {title ?? "untitled"}
          </div>
          {descriptionSubtext}
          {lastEditSubtext}
        </div>
      </Link>
    </li>
  );
};

export { ArticleListItem };
