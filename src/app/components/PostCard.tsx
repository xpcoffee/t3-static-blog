import Link from "next/link";
import { FrontMatter } from "~/utils/markdownUtils";

type Props = { frontMatter: FrontMatter };

export function PostCard({ frontMatter }: Props) {
  const { slug, title, description } = frontMatter;

  return (
    <Link href={`/article/${slug}`}>
      <h3>{title}</h3>
      <div>{description}</div>
    </Link>
  );
}
