import React, { type FC, type PropsWithChildren, type ReactNode } from "react";
import { getIcon, type FAIcon } from "~/utils/fontAwesome";

type Props = PropsWithChildren<{
  icon: FAIcon;
  header?: ReactNode;
}>;

const IconParagraph: FC<Props> = ({ icon, header, children }) => {
  return (
    <>
      {header ? (
        <b>
          {getIcon(icon)}
          {header}: &nbsp;
        </b>
      ) : (
        <b>{getIcon(icon)}</b>
      )}
      {children}
    </>
  );
};

export default IconParagraph;
