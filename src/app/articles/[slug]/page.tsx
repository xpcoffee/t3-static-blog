import {
  getMarkdownContentForSlug,
  getMarkdownContentSlugs,
} from "~/utils/markdownUtils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Card from "~/app/components/Card";
import { Layout } from "~/app/components/Layout";
import { getIcon } from "~/utils/fontAwesome";
import IconParagraph from "~/app/components/IconParagraph";
import Link from "next/link";

type Props = {
  // there has to be a more sane way of typechecking static params.....
  params: { slug: string };
};

export default ({ params }: Props) => {
  const slug = params.slug;
  const article = getMarkdownContentForSlug(slug);
  const icon = getIcon(article.frontMatter?.faIcon);

  return (
    <Layout>
      <article>
        <h1>
          {icon}
          {article.frontMatter.title}
        </h1>
        <MDXRemote source={article.content} components={components} />
      </article>
    </Layout>
  );
};

/**
 * Tells nextjs which slugs should be rendered statically.
 */
export const generateStaticParams = async () => {
  console.log(getMarkdownContentSlugs());
  return getMarkdownContentSlugs().map((slug) => ({ slug }));
};

const components = {
  Card: Card,
  IconParagraph: IconParagraph,
  Link: Link,
};
