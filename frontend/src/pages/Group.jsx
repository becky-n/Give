import React from "react";
import AppLayout from "../layouts/AppLayout";
import LeftSidebar from "../components/LeftSideBar";
import PostsList from "../components/PostsList";
import { GroupTab, GroupSearch, CreatePost } from "../";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { usePosts } from "../hooks/UsePosts";
import { groupTabConfig } from "../config/tabConfig";

export default function Group() {
  const id = new URLSearchParams(window.location.search).get("id");
  const { user, loading: authLoading } = useAuth();
  const { posts, loading: postsLoading } = usePosts();

  const currentTab = "group";
  const handleTabChange = () => {};

  if (authLoading) return null;
  if (!user) return <Navigate to="/" replace />;

  return (
    <AppLayout
      left={
        <LeftSidebar
          screenTabProps={{
            tabConfig: groupTabConfig,
            onTabChange: handleTabChange,
            onCurrentTab: currentTab,
          }}
          extra={
            <div className="flex-1 overflow-y-hidden">
              <GroupTab id={id} />
            </div>
          }
        />
      }
      center={<PostsList posts={posts} />}
      right={<GroupSearch />}
    />
  );
}
