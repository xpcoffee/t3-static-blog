import { getMarkdownContent } from "~/utils/markdownUtils";
import { PostCard } from "./components/PostCard";

export default async function Home() {
  const markdownContent = getMarkdownContent("src/posts");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Home</h1>

      <ul>
        {markdownContent.map((postContent, index) => (
          <PostCard key={index} frontMatter={postContent.frontMatter} />
        ))}
      </ul>
    </main>
  );
}
