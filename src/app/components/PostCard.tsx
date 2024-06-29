import Link from "next/link";
import { type FrontMatter } from "~/utils/markdownUtils";

type Props = FrontMatter & { slug: string };

export function PostCard({ slug, title, description }: Props) {
  return (
    <Link href={`/article/${slug}`}>
      <h3>{title}</h3>
      <div>{description}</div>
    </Link>
  );
}
