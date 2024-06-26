import React, { FC, PropsWithChildren } from "react";
import { HeadingData, renderHeadings } from "~/utils/headings";
import { ArticleHeading } from "../../components/mdx/articleHeading";

type Props = PropsWithChildren<{ headings: HeadingData[]; depth?: number }>;

const ArticleHeadings = ({ headings }: Props) => {
  return renderHeadings({
    headings,
    Heading: ArticleHeading,
    HeadingGroup,
    RootHeadingGroup,
  });
};

const RootHeadingGroup: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul
      tabIndex={0}
      aria-label="Article contents"
      className="mx-0 w-full list-none px-8"
    >
      {children}
    </ul>
  );
};

const HeadingGroup: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul tabIndex={-1} className="quicksand mx-0 w-full list-none pl-3 pr-8">
      {children}
    </ul>
  );
};

export { ArticleHeadings };
