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
    const matterResult = matter(contents);
    const frontMatter = toFrontMatter(fileName, matterResult.data);
    return {
      frontMatter,
      content: matterResult.content,
    };
  });

  return markdownContent;
}

const fileNameFromSlug = (slug: string): string => {
  return `${slug}.md`;
};

export function getMarkdownContentForSlug(basePath: string, slug: string) {
  const fileName = fileNameFromSlug(slug);
  const contents = fs.readFileSync(path.join(basePath, fileName), "utf8");
  const matterResult = matter(contents);
  const frontMatter = toFrontMatter(fileName, matterResult.data);

  return {
    frontMatter,
    content: matterResult.content,
  };
}

export type FrontMatter = {
  slug: string;
  title: string;
  description: string;
};

function toFrontMatter(
  fileName: string,
  data: Record<string, any>,
): FrontMatter {
  console.log("filename:" + JSON.stringify(fileName));

  return {
    slug: fileName.replace(".md", ""),
    title: data["title"] ?? "unkown article",
    description: data["description"] ?? "unkown description",
  };
}
