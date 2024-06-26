import React, { useState, useEffect } from "react"
import { getIcon } from "../utils/fontAwesome"
import { Link } from "gatsby"

export const ToolPanel = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const [showPanel, setShowPanel] = useState(false)

  const onclick = () => {
    setShowPanel(previousValue => {
      console.log({
        showPanel,
        previousValue,
        returnValue: !previousValue,
      })
      return !previousValue
    })
  }

  if (!children) {
    return <></>
  }

  return (
    <div
      className={
        className +
        " bottom-0 z-20 fixed flex flex-col justify-end max-h-full w-full drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]" +
        " md:panel-width md:min-w-40 md:h-fit md:drop-shadow-none" +
        " md:sticky md:block md:top-0 md:justify-start"
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
          "flex justify-center items-center" +
          " bg-gray-50 dark:text-gray-300 dark:bg-gray-700 hover:text-orange-400 visited:hover:text-orange-400 visited:text-gray-300" +
          " text-center text-lg" +
          " rounded-t-xlg h-16" +
          " block md:hidden"
        }
      >
        <Link
          to="/"
          className={
            "w-full max-w-[30%] h-full flex items-center justify-center visited:text-gray-300"
          }
          aria-label="Home"
        >
          {getIcon("faHome")}
        </Link>
        <button
          className={"w-full max-w-[30%] h-full visited:text-gray-300"}
          onClick={onclick}
          aria-label={showPanel ? "Close contents" : "Contents"}
        >
          {showPanel ? getIcon("faTimes") : getIcon("faBars")}
        </button>
      </div>
    </div>
  )
}
