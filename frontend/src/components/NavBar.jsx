import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ReactComponent as NotificationIcon } from "../assets/notification.svg";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import clsx from "clsx";
import { searchAll } from "../services/Search";

function NavBar() {
  const { user } = useAuth();
  const displayName =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "User");
  const profilePic = user?.photoURL || "https://placehold.co/600x400.png";

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Currently dropdown only; no navigation yet
  };

  // Debounced Firestore search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchQuery.trim()) {
      setFilteredSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchAll(searchQuery);

        const items = [
          // Users
          ...res.users.map((u) => ({
            label: `@${u.displayName || u.username || ""}`.trim(),
            type: "user",
          })),
          // Groups
          ...res.groups.map((g) => ({
            label: `Group: ${g.name || g.displayName || ""}`.trim(),
            type: "group",
          })),
          // Tags
          ...res.posts.byTag.flatMap((p) => {
            const tags = Array.isArray(p.tags) ? p.tags : [];
            const match =
              tags.find((t) =>
                (t || "")
                  .toLowerCase()
                  .includes(searchQuery.trim().toLowerCase().replace(/^#/, ""))
              ) || tags[0] || "";
            return match
              ? [{ label: `#${match.replace(/^#/, "")}`, type: "tag" }]
              : [];
          }),
          // Authors
          ...res.posts.byAuthor.map((p) => ({
            label: `Author: ${p.authorDisplayName || ""}`.trim(),
            type: "post_author",
          })),
          // Content
          ...res.posts.byContent.map((p) => ({
            label: `${(p.content || "").slice(0, 60)}${
              (p.content || "").length > 60 ? "…" : ""
            }`,
            type: "post_content",
          })),
        ]
          .filter(
            (it, idx, arr) =>
              it.label && arr.findIndex((x) => x.label === it.label) === idx
          )
          .slice(0, 12);

        setFilteredSuggestions(items);
        setShowDropdown(items.length > 0);
      } catch (err) {
        console.error("[NavBar] search error", err);
        setFilteredSuggestions([]);
        setShowDropdown(false);
      }
    }, 250);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center relative h-[90px]">
      {/* Brand */}
      <div className="cursor-pointer w-[27%] flex justify-start">
        <h1 className="text-defaultYellow text-4xl font-bold font-header">Give</h1>
      </div>

      <div className="w-[46%] flex gap-4">
        <div className="w-full max-w-[500px]">
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 relative"
            ref={dropdownRef}
          >
            <div className="relative flex items-center w-full py-1 pl-5 pr-2 rounded-full bg-darkGrey placeholder-black/40">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search @users, Groups, #tags, or Posts…"
                className="w-full text-base bg-darkGrey placeholder-black/40 outline-none"
              />
              {showDropdown && (
                <ul
                  style={{ top: "2.7rem", borderColor: "#cacaca" }}
                  className="absolute left-0 right-0 text-base mt-1 bg-backgroundGrey border rounded-[1rem] shadow-md max-h-60 overflow-y-auto z-50"
                >
                  {filteredSuggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 text-left group hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="text-base text-gray-600 group-hover:text-black">
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="submit"
                className="right-2 p-2 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 stroke-2 text-black opacity-60 hover:opacity-100"
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

        <button className="p-2.5 rounded-full flex items-center justify-center bg-darkGrey">
          <NotificationIcon className="w-6 h-6 stroke-2 text-gray-600" />
        </button>
      </div>

      <div className="flex items-center gap-4 w-[27%] justify-end">
        <div className="flex items-center gap-2 cursor-pointer rounded-[25px]">
          <div
            className={clsx(
              "w-[45px] h-[45px] rounded-full border-2 border-darkGrey",
              { "bg-gray-300": !user?.photoURL }
            )}
          >
            <img
              src={profilePic}
              alt={`${displayName} Avatar`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-700 text-lg">
            {displayName}
          </span>
        </div>
        <button className="rounded-full flex items-center justify-center">
          <SettingsIcon className="w-10 h-10" />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
