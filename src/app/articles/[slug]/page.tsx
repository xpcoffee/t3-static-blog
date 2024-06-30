import "~/styles/prism.css";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypePrismPlus from "rehype-prism-plus";
import {
  getMarkdownContentForSlug,
  getMarkdownContentSlugs,
} from "~/utils/markdownUtils";
import Card from "~/app/components/Card";
import { Layout } from "~/app/components/Layout";
import { getIcon } from "~/utils/fontAwesome";
import IconParagraph from "~/app/components/IconParagraph";
import { PullQuote } from "~/app/components/Pullquote";
import { Disclaimer } from "~/app/components/Disclaimer";
import { PatternArticleList } from "~/app/components/PatternArticleList";
import { ModalScale } from "~/app/components/Scale";
import Image from "next/image";
import IconCheckCircle from "~/app/components/IconCheckCircle";

type Props = {
  // there has to be a more sane way of typechecking static params.....
  params: { slug: string };
};

const Article = ({ params }: Props) => {
  const slug = params.slug;
  const article = getMarkdownContentForSlug(slug);
  const icon = getIcon(article.frontMatter?.faIcon);
  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeMdxCodeProps, rehypePrismPlus],
      tsx: true,
    },
  };

  return (
    <Layout>
      <article>
        <h1>
          {icon}
          {article.frontMatter.title}
        </h1>
        <MDXRemote
          source={article.content}
          components={components}
          options={mdxOptions}
        />
      </article>
    </Layout>
  );
};

export default Article;

/**
 * Tells nextjs which slugs should be rendered statically.
 */
export const generateStaticParams = async () => {
  return getMarkdownContentSlugs().map((slug) => ({ slug }));
};

const components = {
  Card: Card,
  IconParagraph: IconParagraph,
  Link: Link,
  Image: Image,
  PullQuote: PullQuote,
  Disclaimer: Disclaimer,
  PatternArticleList: PatternArticleList,
  IconCheckCircle: IconCheckCircle,
  ModalScale: ModalScale,
};
