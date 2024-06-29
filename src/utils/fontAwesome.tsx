import React from "react";
import * as FontAwesome from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type FAIcon = keyof typeof FontAwesome;

export function getIcon(faIcon: string | null | undefined) {
  if (!faIcon) {
    return undefined;
  }

  try {
    return (
      //@ts-expect-error there is no good way to do type safety when transforming to an icon (e.g. no authoritative list)
      <FontAwesomeIcon icon={FontAwesome[faIcon as FAIcon]} className="mr-2" />
    );
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
