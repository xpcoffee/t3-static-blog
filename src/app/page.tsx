import { getMarkdownMetadata } from "~/utils/markdownUtils";
import { ArticleListItem } from "./components/ArticleListItem";
import { Layout } from "./components/Layout";
import StaticFeeds from "./components/StaticFeeds";

export default async function Home() {
  const articleListItems = getMarkdownMetadata()
    .sort((a, b) => {
      return b.date > a.date ? 1 : -1;
    })
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
    <Layout>
      {/* <Seo title="Home" /> */}
      <p id="article-list-label">
        {"A collection of "}
        <a href="https://en.wikipedia.org/wiki/Living_document" target="blank">
          living
        </a>
        {" notes and thoughts."}
      </p>
      <ul
        aria-labelledby="article-list-label"
        tabIndex={0}
        className="ml-0 mt-3 list-none"
      >
        {articleListItems}
      </ul>
      <StaticFeeds />
    </Layout>
  );
}
