import fs from "fs";
import path from "path";
import matter from "gray-matter";

const fileNameFromSlug = (slug: string): string => {
  return `${slug}.md`;
};

const ARTICLES_DIR = "articles";

export function getMarkdownMetadata() {
  function getMetadataForFile(filename: string) {
    const slug = filename.replace(".mdx", "");
    const contents = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
    const matterResult = matter(contents);

    return {
      ...toFrontMatter(matterResult.data),
      slug,
    };
  }

  return fs
    .readdirSync(path.join(ARTICLES_DIR), { withFileTypes: true })
    .filter((file) => file.isFile())
    .map((file) => getMetadataForFile(file.name));
}

export function getMarkdownContentSlugs() {
  return fs
    .readdirSync(path.join(ARTICLES_DIR), { withFileTypes: true })
    .filter((file) => file.isFile())
    .map((file) => file.name.replace(".mdx", ""));
}

export function getMarkdownContentForSlug(slug: string) {
  const fileName = fileNameFromSlug(slug);
  const contents = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const matterResult = matter(contents);
  const frontMatter = toFrontMatter(matterResult.data);

  return {
    frontMatter,
    content: matterResult.content,
  };
}

export type FrontMatter = {
  title: string;
  description: string;
};

function toFrontMatter(data: Record<string, any>): FrontMatter {
  return {
    title: data["title"] ?? "unkown article",
    description: data["description"] ?? "unkown description",
  };
}
