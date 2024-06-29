import React from "react";
import { getMarkdownMetadata } from "~/utils/markdownUtils";
import { ArticleListItem } from "./ArticleListItem";

export const PatternArticleList: React.FC = () => {
  const articleListItems = getMarkdownMetadata()
    .sort((a, b) => {
      return b.date > a.date ? 1 : -1;
    })
    .filter((article) => article.slug.startsWith("pattern-"))
    .map((metadata) => {
      return (
        <ArticleListItem
          key={metadata.id}
          articlePath={metadata.slug ?? "404"}
          title={metadata.title}
          description={metadata.description}
          faIconName={metadata?.faIcon}
          lastEdit={metadata?.lastEdit}
        />
      );
    });

  return (
    <ul
      aria-labelledby="article-list-label"
      tabIndex={0}
      className="ml-0 mt-3 list-none"
    >
      {articleListItems}
    </ul>
  );
};
