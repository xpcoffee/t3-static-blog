import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = "articles";

export function getMarkdownMetadata() {
  function getMetadataForFile(filename: string) {
    const slug = filenameToSlug(filename);
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
    .map((file) => filenameToSlug(file.name));
}

export function getMarkdownContentForSlug(slug: string) {
  const fileName = slugToFilename(slug);
  const contents = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const matterResult = matter(contents);
  const frontMatter = toFrontMatter(matterResult.data);

  return {
    frontMatter,
    content: matterResult.content,
  };
}

export type FrontMatter = {
  id: string;
  title: string;
  description: string;
  faIcon: string;
  lastEdit: string;
};

function toFrontMatter(data: Record<string, any>): FrontMatter {
  return {
    id: data["id"] ?? "404-id-not-found",
    title: data["title"] ?? "unknown article",
    description: data["description"] ?? "unknown description",
    faIcon: data["faIcon"] ?? "faHome",
    lastEdit: data["lastEdit"] ?? "unknown description",
  };
}

const slugToFilename = (slug: string): string => {
  return `${slug}.mdx`;
};

const filenameToSlug = (filename: string): string => {
  return filename.replace(".mdx", "");
};
