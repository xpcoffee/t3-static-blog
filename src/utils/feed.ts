import { Feed } from "feed";
import { getMarkdownMetadata } from "./markdownUtils";
import fs from "fs";
import path from "path";

const site = "https://emerickbosch.com";
const updated = new Date(Date.now());
const author = {
  name: "Emerick Bosch",
  email: "xpc.dev@gmail.com",
  link: site,
};

const files = {
  rss: "rss.xml",
  json: "feed.json",
  atom: "atom.xml",
};
const feed = new Feed({
  title: "Emerick Bosch - ☕ ⌨️ ⚙️",
  description: "Some of my thoughts",
  id: site,
  link: site,
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: site + "/xpcoffee-icon.svg",
  favicon: site + "/xpcoffee-icon.svg",
  copyright: `${updated.getFullYear()}, ${author.name}`,
  feedLinks: Object.entries(files).reduce(
    (links, [key, value]) => {
      links[key] = site + value;
      return links;
    },
    {} as Record<string, string>,
  ),
  author,
});

export function generateFeeds(outputFolder: string) {
  const posts = getMarkdownMetadata();

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: `${site}/articles/${post.id}`,
      description: post.description,
      author: [author],
      contributor: [],
      date: post.date,
    });
  });

  fs.writeFileSync(path.join(outputFolder, files.rss), feed.rss2());
  fs.writeFileSync(path.join(outputFolder, files.atom), feed.atom1());
  fs.writeFileSync(path.join(outputFolder, files.json), feed.json1());

  const generatedFiles = [
    path.join(outputFolder, files.rss),
    path.join(outputFolder, files.atom),
    path.join(outputFolder, files.json),
  ];

  return generatedFiles;
}
