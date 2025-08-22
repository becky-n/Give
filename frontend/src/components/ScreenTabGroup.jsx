import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ScreenTabGroup({ onTabChange, onCurrentTab }) {
const isHome = onCurrentTab === "home";
  const isCreate = onCurrentTab === "create";

  const row = (children, onClick, active = false) => (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      className={
        "flex items-center p-2 rounded-xl gap-3 select-none cursor-pointer " +
        (active ? "bg-defaultYellow" : "bg-backgroundGrey hover:bg-lightYellow")
      }
    >
      {children}
    </div>
  );

  return (
    <div className="w-full rounded-xl">
      <div className="bg-backgroundGrey rounded-3xl p-4 flex flex-col gap-1.5">
         <div className="flex items-center p-2 rounded-xl bg-defaultYellow gap-3"
          >
              <img
                src="/groups.svg"
                alt="groups icon"
                style={{ width: "1.5em", height: "1.5em" }}
              />
              <p className="font-semibold text-base text-black">View Group</p>
        </div>
        {/* Containers for each option */}
        <Link
            to="/home"
            className="flex items-center p-2 rounded-xl bg-backgroundGrey gap-3 hover:bg-lightYellow"
          >
              <img
                src="/Home.png"
                alt="home icon"
                style={{ width: "1.5em", height: "1.5em" }}
              />
              <p className="font-semibold text-base text-black">Home Feed</p>
        </Link>
        <Link
          to="/explore"
          className="flex items-center p-2 rounded-xl bg-backgroundGrey gap-3 hover:bg-lightYellow"
        >
          <img
            src="/Eye.png"
            alt="eye icon"
            style={{ width: "1.5em", height: "1.5em" }}
          />
          <p className="font-semibold text-base text-black">Explore Polls</p>
        </Link>
        
      </div>
    </div>
  );
}
