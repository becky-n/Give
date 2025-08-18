import React, { useState } from "react";
import clsx from "clsx";
import "./UserCard.css";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("") || "?";
}

const UserCard = ({ user = {}, group, timeLeft }) => {
  const displayName = user.name || user.displayName || "Anonymous";
  const avatarUrl = user.profilePic || user.photo || user.photoURL || "";
  const [imgOk, setImgOk] = useState(Boolean(avatarUrl));

  return (
    <div className="user-card">
      <div className="avatar">
        {imgOk ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className={clsx("user-profile-pic")}
            referrerPolicy="no-referrer"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className={clsx("user-initials", "withBackground")}>
            {getInitials(displayName)}
          </div>
        )}
      </div>

      <div className="user-info">
        <p className="username">@{displayName}</p>
        {group?.name && (
          <p className="group">
            posted to <span className="group-name">{group.name}</span>
          </p>
        )}
      </div>

      <div className="time">
        <span>{timeLeft || "just now"}</span>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
