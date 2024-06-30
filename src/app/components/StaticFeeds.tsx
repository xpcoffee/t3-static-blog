import { faFeed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { generateFeeds } from "~/utils/feed";

/**
 * >>>> Bit hacky! This has a side-effect of generating the files for the feeds. <<<<
 *
 * It takes advantage of the fact that components are rendered during the build.
 */
const StaticFeeds = () => {
  const feeds = generateFeeds();
  return (
    <Link href={feeds.rss}>
      <FontAwesomeIcon icon={faFeed} />
    </Link>
  );
};

export default StaticFeeds;
