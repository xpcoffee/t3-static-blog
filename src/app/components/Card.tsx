import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  heading?: string;
}>;

const Card = ({ children, heading }: Props) => {
  const header = heading ? (
    <h2 className="mt-2 text-xl text-blue-800 dark:text-orange-300">
      {heading}
    </h2>
  ) : undefined;

  return (
    <div className="my-5 flex border-l-4 border-blue-600 dark:border-orange-400">
      <div className="pl-8">
        {header}
        {children}
      </div>
    </div>
  );
};

export default Card;
