import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getMarkdownContent(basePath: string) {
  const folder = `${basePath}/`;
  const files = fs.readdirSync(folder);
  const markdownFiles = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".mdx"),
  );

  const markdownContent = markdownFiles.map((fileName) => {
    const contents = fs.readFileSync(path.join(basePath, fileName), "utf8");
    const frontMatter = toFrontMatter(matter(contents).data);
    return {
      frontMatter,
    };
  });

  return markdownContent;
}

type FrontMatter = {
  slug: string;
  title: string;
};

function toFrontMatter(data: Record<string, any>): FrontMatter {
  return {
    slug: data["slug"] ?? "unkown-article",
    title: data["title"] ?? "unkown article",
  };
}
