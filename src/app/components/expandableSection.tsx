import React from "react"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  /**
   * The header to display. Required.
   */
  header: React.ReactNode
  /**
   * Function that can be used to define what kind of element should wrap the header (h1/h2/div etc). Defaults to <h3>
   */
  headerElementWrapper?: (children: React.ReactNode) => React.ReactNode
  /**
   * A short description of the section.
   */
  description?: string
  /**
   * Whether the section content is initially hidden. Defaults to false.
   */
  initiallyHidden: boolean
}>

const ExpandableSection = ({
  children,
  header,
  headerElementWrapper = children => <h3>{children}</h3>,
  description,
  initiallyHidden: initiallyClosed = false,
}: Props) => {
  return (
    <details className="mb-4">
      <summary className="cursor-pointer">
        {headerElementWrapper(<>{header}</>)}
        <br />
        <div className="quicksand">{description}</div>
      </summary>
      <div className={`ml-8 mt-4 mb-4`}>{children}</div>
    </details>
  )
}

export { ExpandableSection }
