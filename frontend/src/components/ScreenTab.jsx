
import React from "react";
import { Link } from "react-router-dom";
import { TabRow } from "./ScreenTabGroup";
import { homeTabConfig } from "../config/tabConfig";

export default function ScreenTab({ onTabChange, onCurrentTab }) {
  return (
    <div className="w-full rounded-xl">
      <div className="bg-backgroundGrey rounded-3xl p-4 flex flex-col gap-1.5">
        {homeTabConfig.map((tab) =>
          tab.link ? (
            <TabRow
              key={tab.label}
              icon={tab.icon}
              label={tab.label}
              link={tab.link}
              active={tab.activeKey && tab.activeKey === onCurrentTab}
            />
          ) : (
            <TabRow
              key={tab.label}
              icon={tab.icon}
              label={tab.label}
              active={tab.activeKey && tab.activeKey === onCurrentTab}
              onClick={() => tab.activeKey && onTabChange(tab.activeKey)}
            />
          )
        )}
      </div>
    </div>
  );
}
