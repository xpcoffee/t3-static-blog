import chalk from "chalk";
import ora from "ora";
import { generateFeeds } from "~/utils/feed";
import { config } from "./config";

const spinner = ora("Generating files for feeds").start();
// output files for feeds into out/ after build is done

try {
  generateFeeds(config.distFolder);
  spinner.succeed("Feed files generated");
} catch (e) {
  console.error(chalk.redBright(e));
  spinner.fail("Error generating feed files");
}
