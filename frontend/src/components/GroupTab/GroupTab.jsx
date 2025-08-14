import React, { useState } from "react";

export default function Grouptab() {
  const [showMembers, setShowMembers] = useState(false);

  const members = [
    "@katesmith0001",
    "@katesmith0001",
    "@katesmith0001",
    "@katesmith0001",
    "@katesmith0001",
    "@katesmith0001",
  ];

  return (
    <div className="w-72 p-4 rounded-xl">
      <div className="bg-backgroundGrey rounded-xl p-4">
        {/* Group Header */}
        <div className="flex items-center p-4 rounded-xl  bg-defaultYellow gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="font-semibold text-base text-black">Group 1</p>
            <p className="text-xs text-black-600">6 members</p>
          </div>
        </div>

        {/* Most Used Tags */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-left text-black">
            Most Used Tags
          </h3>
          <ul className="text-sm mt-2 space-y-1 font-medium text-black">
            <li className="flex justify-between items-center cursor-pointer">
              #snacks{" "}
              <img
                src="/arrow.svg"
                alt="arrow right"
                style={{ width: "0.75em", height: "0.75em" }}
              />
            </li>
            <li className="flex justify-between items-center cursor-pointer">
              #movie{" "}
              <img
                src="/arrow.svg"
                alt="arrow right"
                style={{ width: "0.75em", height: "0.75em" }}
              />
            </li>
            <li className="flex justify-between items-center cursor-pointer">
              #dinner{" "}
              <img
                src="/arrow.svg"
                alt="arrow right"
                style={{ width: "0.75em", height: "0.75em" }}
              />
            </li>
          </ul>
        </div>

        {/* View Members */}
        <div className="mt-5">
          <button
            className="flex justify-between w-full font-semibold text-sm"
            onClick={() => setShowMembers(!showMembers)}
          >
            View Members
            <span>
              {showMembers ? (
                <img
                  src="/arrow.svg"
                  alt="arrow up"
                  style={{
                    width: "0.75em",
                    height: "0.75em",
                    transform: "rotate(-90deg)",
                  }}
                />
              ) : (
                <img
                  src="/arrow.svg"
                  alt="arrow down"
                  style={{
                    width: "0.75em",
                    height: "0.75em",
                    transform: "rotate(90deg)",
                  }}
                />
              )}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showMembers ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-3 space-y-2">
              {members.map((name, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                    alt="avatar"
                    className="w-5 h-5"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

