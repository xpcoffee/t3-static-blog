import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { PropsWithChildren } from "react";

const Disclaimer = ({
  children,
  heading,
}: PropsWithChildren<{ heading: string }>) => {
  return (
    <div className="my-5 flex items-center border-l-4 border-red-400">
      <div className="flex w-10 justify-center text-red-600">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </div>
      <div>
        <b className="text-red-800">{heading ? heading : "Disclaimer"}</b>
        {children}
      </div>
    </div>
  );
};

export { Disclaimer };

