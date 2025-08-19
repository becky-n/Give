import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ScreenTab({onTabChange}) {

  return (
    <div className="w-full rounded-xl">
      <div className="bg-backgroundGrey rounded-3xl p-4 flex flex-col gap-1.5">

        {/* Containers for each option */}
        <div className="flex items-center p-2 rounded-xl  bg-defaultYellow gap-3">
            <div>
              <img
                  src="/Home.png"
                  alt="home icon"
                  style={{ width: "1.5em", height: "1.5em" }}
                  onClick={() => onTabChange("home")}
                />
            </div>
            <div>
              <p className="font-semibold text-base text-black ">Home Feed</p>
            </div>
        </div>
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
        <div
            className="flex items-center p-2 rounded-xl bg-backgroundGrey gap-3 hover:bg-lightYellow"
          >
              <img
                src="/Plus.png"
                alt="plus icon"
                style={{ width: "1.5em", height: "1.5em" }}
                onClick={() => onTabChange("create")}
              />
              <p className="font-semibold text-base text-black">Create Post</p>
        </div>
      </div>
    </div>
  );
}
