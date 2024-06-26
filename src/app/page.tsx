import { getMarkdownMetadata } from "~/utils/markdownUtils";
import { PostCard } from "./components/PostCard";

export default async function Home() {
  const markdownMetadata = getMarkdownMetadata();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Home</h1>

      <ul>
        {markdownMetadata.map((articleMetadata, index) => (
          <PostCard key={index} {...articleMetadata} />
        ))}
      </ul>
    </main>
  );
}
