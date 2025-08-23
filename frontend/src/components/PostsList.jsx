import React from "react";
import { Post } from "../";

export default function PostsList({ posts }) {
  if (!posts?.length) return null;
  return posts.map((p) => (
    <Post
      key={p.id}
      user={{
        id: p.authorId ?? undefined,
        name: p.authorDisplayName || "unknown",
        profilePic: p.authorPhotoURL || undefined,
      }}
      group={p.group || undefined}
      post={p}
    />
  ));
}