import React, { useState } from "react";
import { getIcon } from "~/utils/fontAwesome";
import Link from "next/link";

export const ToolPanel = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showPanel, setShowPanel] = useState(false);

  const onclick = () => {
    setShowPanel((previousValue) => {
      console.log({
        showPanel,
        previousValue,
        returnValue: !previousValue,
      });
      return !previousValue;
    });
  };

  if (!children) {
    return <></>;
  }

  return (
    <div
      className={
        className +
        " fixed bottom-0 z-20 flex max-h-full w-full flex-col justify-end drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]" +
        " md:panel-width md:h-fit md:min-w-40 md:drop-shadow-none" +
        " md:sticky md:top-0 md:block md:justify-start"
      }
    >
      <div
        className={
          "grow overflow-y-auto pt-5" +
          " bg-white" +
          " dark:bg-slate-800 md:dark:bg-inherit" +
          " md:grow-0" +
          `${!showPanel ? " hidden md:block" : ""}`
        }
      >
        {children}
      </div>
      <div
        className={
          "flex items-center justify-center" +
          " bg-gray-50 visited:text-gray-300 hover:text-orange-400 visited:hover:text-orange-400 dark:bg-gray-700 dark:text-gray-300" +
          " text-center text-lg" +
          " rounded-t-xlg h-16" +
          " block md:hidden"
        }
      >
        <Link
          href="/"
          className={
            "flex h-full w-full max-w-[30%] items-center justify-center visited:text-gray-300"
          }
          aria-label="Home"
        >
          {getIcon("faHome")}
        </Link>
        <button
          className={"h-full w-full max-w-[30%] visited:text-gray-300"}
          onClick={onclick}
          aria-label={showPanel ? "Close contents" : "Contents"}
        >
          {showPanel ? getIcon("faTimes") : getIcon("faBars")}
        </button>
      </div>
    </div>
  );
};
