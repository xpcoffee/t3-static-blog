import Markdown from "markdown-to-jsx";
import {
  getMarkdownContentForSlug,
  getMarkdownContentSlugs,
} from "~/utils/markdownUtils";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  // there has to be a more sane way of typechecking static params.....
  params: { slug: string };
};

export default ({ params }: Props) => {
  const slug = params.slug;
  const article = getMarkdownContentForSlug(slug);

  return (
    <article className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>{article.frontMatter.title}</h1>
      <MDXRemote source={article.content} />
    </article>
  );
};

/**
 * Tells nextjs which slugs should be rendered statically.
 */
export const generateStaticParams = async () => {
  return getMarkdownContentSlugs().map((slug) => ({ slug }));
};
