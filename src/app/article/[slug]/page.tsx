import Markdown from "markdown-to-jsx";
import {
  getMarkdownContent,
  getMarkdownContentForSlug,
} from "~/utils/markdownUtils";

const POSTS_DIR = "src/posts";

export const generateStaticParams = async () => {
  const posts = getMarkdownContent(POSTS_DIR);

  // this has to return just the slug; cannot return post contents
  return posts.map((post) => ({
    slug: post.frontMatter.slug,
  }));
};

type Props = {
  // there has to be a more sane way of typechecking static params.....
  params: { slug: string };
};

export default ({ params }: Props) => {
  const slug = params.slug;
  const article = getMarkdownContentForSlug(POSTS_DIR, slug);

  return (
    <main>
      Hello blank article
      <Markdown>{article.content}</Markdown>
    </main>
  );
};
