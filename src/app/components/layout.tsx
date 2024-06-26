"use client";

import React from "react";
import { ToolPanel } from "./ToolPanel";
import { SocialInfo } from "./socialInfo";
import { AboutLink } from "./aboutLink";
import { EmojiLogo } from "./emojiLogo";
import { ThisIsMySite } from "./tagLine";
import { Title } from "./title";

/**
 * On smaller screens, the layout is verticle (single column grid)
 *
 * After the md breakpoint, the grid layout is as follows:
 *
 *         Col1       Col2     Col3     Col4        Col5
 * Row 1 |           | title |       | about me |            |
 * Row 2 |           |     horizontal line      |  margin    |
 * Row 2 | toolpanel |         content          |  (unused)  |
 * Row 4 |           | emoji |  tag  |  social  |            |
 */
const Layout = ({
  children,
  toolPanelContents,
}: React.PropsWithChildren<{ toolPanelContents?: React.ReactNode }>) => {
  // const { site, allFile } = useStaticQuery<>(
  //   graphql`
  //     query LayoutQuery {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //       allFile(
  //         limit: 1
  //         filter: {
  //           name: { eq: "xpcoffee-icon" }
  //           ext: { eq: ".svg" }
  //           sourceInstanceName: { eq: "images" }
  //           relativeDirectory: { eq: "" }
  //         }
  //       ) {
  //         nodes {
  //           publicURL
  //         }
  //       }
  //     }
  //   `,
  // )

  const site = {
    siteMetadata: {
      title: "hehah",
    },
  };

  const allFile = {
    nodes: [
      {
        publicURL: "oooahhahah",
      },
    ],
  };

  const title = site?.siteMetadata?.title ?? `xpcoffee`;

  return (
    <div id="app-layout" className="flex justify-center">
      <div className="md:grid-desktop my-5 grid flex-1 grid-cols-1 gap-5 overflow-y-scroll">
        <title>{title}</title>
        <Title
          className="order-1 justify-self-center md:col-span-2 md:col-start-2 md:col-end-2 md:row-start-1 md:row-end-1 md:self-center md:justify-self-start"
          titleText={title}
          iconUrl={allFile.nodes[0]?.publicURL}
        />
        <ThisIsMySite className="order-2 md:col-start-3 md:col-end-3 md:row-start-4 md:row-end-4 md:self-center" />
        <hr className="hidden md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-2 md:block"></hr>
        {toolPanelContents && (
          <ToolPanel className="order-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4">
            {toolPanelContents}
          </ToolPanel>
        )}
        <div className="order-4 self-start py-5 md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-3 md:flex md:justify-center">
          <main className="read-width m-5 text-gray-800 dark:text-gray-400">
            {children}
          </main>
        </div>
        <AboutLink className="order-5 justify-self-center md:col-start-4 md:col-end-4 md:row-start-1 md:row-end-1 md:self-center md:justify-self-end" />
        <SocialInfo className="order-6 md:col-start-4 md:col-end-4 md:row-start-4 md:row-end-4 md:my-3 md:justify-self-end" />
        <EmojiLogo className="order-7 mb-20 md:col-start-2 md:col-end-2 md:row-start-4 md:row-end-4 md:mb-0 md:self-center md:justify-self-start" />
      </div>
    </div>
  );
};

export { Layout };
