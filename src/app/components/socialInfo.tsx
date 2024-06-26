import React from "react"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SocialInfo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} flex flex-col gap-3 items-center md:items-start md:gap-1 md:text-sm quicksand`}
    >
      <div>
        <FontAwesomeIcon className="mr-2" icon={faGithub} />
        <a
          className="dark:text-indigo-300 dark:visited:text-indigo-300"
          href="https://github.com/xpcoffee"
        >
          xpcoffee
        </a>
      </div>
      <div>
        <FontAwesomeIcon className="mr-2" icon={faTwitter} />
        <a
          className="dark:text-indigo-300 dark:visited:text-indigo-300"
          href="https://twitter.com/explodedcoffee"
        >
          explodedcoffee
        </a>
      </div>
      <div>
        <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
        <a
          className="dark:text-indigo-300 dark:visited:text-indigo-300"
          href="https://www.linkedin.com/in/emerickbosch"
        >
          emerickbosch
        </a>
      </div>
    </div>
  )
}

export { SocialInfo }
