import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { PropsWithChildren } from "react"

const Disclaimer = ({children, heading}: PropsWithChildren<{heading: string}>) => {
    return (
        <div className="my-5 border-l-4 border-red-400  flex items-center">
            <div className="w-10 text-red-600 flex justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div>
                <p><b className="text-red-800">{heading ? heading : "Disclaimer"}</b></p>
                {children}
            </div>
        </div>
    )
}

export {
    Disclaimer
}