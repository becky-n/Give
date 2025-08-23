import React from "react";
import { UserInfo, ScreenTab } from "..";

// Pass whatever ScreenTab needs via screenTabProps
export default function LeftSideBar({ screenTabProps, extra }) {
  return (
    <>
      <UserInfo />
      <ScreenTab {...screenTabProps} />
      {extra}
    </>
  );
}