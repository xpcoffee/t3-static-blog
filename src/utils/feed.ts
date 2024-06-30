import { Feed } from "feed";
import { getMarkdownMetadata } from "./markdownUtils";
import fs from "fs";

const updated = new Date(Date.now());
const author = {
  name: "Emerick Bosch",
  email: "xpc.dev@gmail.com",
  link: "https://emerickbosch.com",
};
const site = "https://emerickbosch.com";

const feedLinks = {
  rss: site + "/rss.xml",
  json: site + "/json",
  atom: site + "/atom",
};
const feed = new Feed({
  title: "Emerick Bosch - ☕ ⌨️ ⚙️",
  description: "Some of my thoughts",
  id: site,
  link: site,
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "http://example.com/xpcoffee-icon.svg",
  favicon: "http://example.com/xpcoffee-icon.svg",
  copyright: `${updated.getFullYear()}, Emerick Bosch`,
  feedLinks,
  author,
});

export function generateFeeds() {
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

  fs.writeFileSync("./out/rss.xml", feed.rss2());
  fs.writeFileSync("./out/atom", feed.atom1());
  fs.writeFileSync("./out/json", feed.json1());
  return feedLinks;
}
