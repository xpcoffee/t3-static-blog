import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = "articles";

// sorted by most recent first
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
    .map((file) => getMetadataForFile(file.name))
    .sort((a, b) => {
      return b.date > a.date ? 1 : -1;
    });
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
  date: Date;
  lastEdit: Date;
};

function toFrontMatter(data: Record<string, unknown>): FrontMatter {
  return {
    id: typeof data.guid == "string" ? data.guid : "404-id-not-found",
    title: typeof data.title == "string" ? data.title : "unknown article",
    description:
      typeof data.description == "string"
        ? data.description
        : "unknown description",
    faIcon: typeof data.faIcon == "string" ? data.faIcon : "faHome",
    date:
      typeof data.date == "object" && data.date instanceof Date
        ? data.date
        : new Date(),
    lastEdit:
      typeof data.lastEdit == "object" && data.lastEdit instanceof Date
        ? data.lastEdit
        : new Date(),
  };
}

const slugToFilename = (slug: string): string => {
  return `${slug}.mdx`;
};

const filenameToSlug = (filename: string): string => {
  return filename.replace(".mdx", "");
};
