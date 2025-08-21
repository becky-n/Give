import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const expandedGroups = JSON.parse(localStorage.getItem("groupsExpanded")) ?? false;
const searchTerm = localStorage.getItem("groupSearch") ?? "";

export default function GroupSearch() {
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [expanded, setExpanded] = useState(expandedGroups);
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem("groupSearch", e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const groups = [
    { id: 1, name: "Group 1", profilePic: "/photo1.jpg" },
    { id: 2, name: "Group 2", profilePic: "/photo2.jpg" },
    { id: 3, name: "Group 3", profilePic: "/photo3.jpg" },
    { id: 4, name: "Group 4", profilePic: "/group-4-avatar.png" },
    { id: 5, name: "Group 5", profilePic: "/group-5-avatar.png" },
    { id: 6, name: "Group 6", profilePic: "/group-6-avatar.png" },
    { id: 7, name: "Group 7", profilePic: "/group-7-avatar.png" },
    { id: 8, name: "Group 8", profilePic: "/group-8-avatar.png" },
    { id: 9, name: "Group 9", profilePic: "/group-9-avatar.png" },
  ];

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function GroupItem({ group }) {
    const { id, name, profilePic } = group;
    return (
      <li className="flex items-center rounded-xl gap-4 p-2 cursor-pointer group">
        <div className={clsx("w-10 h-10 rounded-full border-2 border-darkGrey overflow-hidden", { "bg-gray-300": !profilePic })}>
          <img
            src={`images/${profilePic}` ?? "/images/placeholder.svg"}
            alt={`${name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <a
          href={`/group?id=${id}`}
          className="font-semibold text-base text-black group-hover:text-black/40"
        >
          {name}
        </a>
      </li>
    );
  }

  const displayedGroups =
    searchQuery.trim()
      ? filteredGroups
      : expanded
      ? filteredGroups
      : groups.slice(0, 5);

  return (
    <div className="w-full h-full relative">
      <div className={`bg-backgroundGrey rounded-3xl p-4 shadow-sm flex flex-col gap-4 ${expanded ? 'h-full' : ''}`}>
        <div>
          <p className="font-semibold text-base text-black text-left">Groups</p>
        </div>

        <div className="flex gap-4">
          <div className="w-full max-w-[500px]" ref={inputRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative flex items-center w-full py-1 pl-5 pr-2 rounded-full bg-darkGrey placeholder-black/40 h-8">
                <input
                  type="text"
                  placeholder="Search Groups"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full text-xs bg-darkGrey placeholder-black/40 outline-none"
                />
                <button
                  type="submit"
                  className="right-2 p-2 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 stroke-2 text-black opacity-60 hover:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* List of Groups */}
        <div className={`flex flex-col gap-2 ${expanded ? "overflow-y-auto" : ""} with-scrollbar items-start`}>
          <ul className='flex flex-col gap-2 grow'>
            {displayedGroups.map((group) => (
              <GroupItem key={group.id} group={group} />
            ))}
          </ul>
          {filteredGroups.length > 5 && !searchQuery.trim() && (
            <button
              type="button"
              className="right-2 p-2 rounded-full flex items-center justify-center "
              onClick={() => {
                localStorage.setItem("groupsExpanded", !expanded);
                setExpanded((prev) => !prev);
              }}
            >
              <p className="text-xs font-semibold text-black opacity-60 hover:opacity-100">
                {expanded ? "Collapse" : "View All"}
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}