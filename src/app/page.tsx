import { getMarkdownContent } from "~/utils/markdownUtils";

export default async function Home() {
  const markdownContent = getMarkdownContent("src/posts");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello home page
      <pre>{JSON.stringify(markdownContent)}</pre>
    </main>
  );
}
