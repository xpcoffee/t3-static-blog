import React, { FC, PropsWithChildren, ReactNode } from "react";
import { getIcon, FAIcon } from "~/utils/fontAwesome";

type Props = PropsWithChildren<{
  icon: FAIcon;
  header?: ReactNode;
}>;

const IconParagraph: FC<Props> = ({ icon, header, children }) => {
  return (
    <p>
      {header ? (
        <b>
          {getIcon(icon)}
          {header}: &nbsp;
        </b>
      ) : (
        <b>{getIcon(icon)}</b>
      )}
      {children}
    </p>
  );
};

export default IconParagraph;
