import React from "react";
import UserCard from "./UserCard";
import PostData from "./PostData";
import PollBox from "./PollBox";

const Post = ({user, group, post, pollOptions}) => {

  return (
    <div className="w-full rounded-3xl p-4 bg-backgroundGrey flex flex-col items-center">
      {/* <UserCard user={user} group={group} timeLeft={post.timeLeft} /> */}
      {/* <PostData post={post} /> */}
      <PollBox initialOptions={pollOptions} />
    </div>
  )
}

export default Post;
